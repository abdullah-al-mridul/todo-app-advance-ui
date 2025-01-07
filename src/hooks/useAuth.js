import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { auth, db } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import {
  setUser,
  setLoading,
  setError,
  logout,
} from "../store/slices/authSlice";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { uploadToCloudinary } from "../config/cloudinary";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const signUp = async ({ email, password, name }) => {
    try {
      dispatch(setLoading(true));
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Send verification email
      await sendEmailVerification(user, {
        url: window.location.origin + "/login", // Redirect URL after verification
        handleCodeInApp: true,
      });

      // Update profile with name
      await updateProfile(user, {
        displayName: name,
      });

      // Create user document in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        emailVerified: false,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      });

      // Show success message but don't log in
      dispatch(setLoading(false));
      return { requiresVerification: true };
    } catch (error) {
      let errorMessage = "রেজিস্টার করতে সমস্যা হয়েছে";

      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = "এই ইমেইল দিয়ে ইতিমধ্যে একাউন্ট খোলা আছে";
          break;
        case "auth/invalid-email":
          errorMessage = "অবৈধ ইমেইল";
          break;
        case "auth/operation-not-allowed":
          errorMessage = "ইমেইল/পাসওয়ার্ড দিয়ে লগইন করা যাবে না";
          break;
        case "auth/weak-password":
          errorMessage = "দুর্বল পাসওয়ার্ড";
          break;
        default:
          errorMessage = error.message;
      }

      dispatch(setError(errorMessage));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const signIn = async ({ email, password }) => {
    try {
      dispatch(setLoading(true));
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      // Check email verification
      if (!user.emailVerified) {
        throw new Error(
          "ইমেইল ভেরিফাই করা হয়নি। অনুগ্রহ করে আপনার ইমেইল চেক করুন।"
        );
      }

      // Update last login
      await setDoc(
        doc(db, "users", user.uid),
        {
          lastLogin: new Date().toISOString(),
          emailVerified: user.emailVerified,
        },
        { merge: true }
      );

      // Get user data from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const userData = userDoc.data();

      // Set user in Redux store
      dispatch(
        setUser({
          uid: user.uid,
          email: user.email,
          name: user.displayName,
          ...userData,
        })
      );
    } catch (error) {
      let errorMessage = "লগইন করতে সমস্যা হয়েছে";

      if (error.message.includes("ইমেইল ভেরিফাই")) {
        errorMessage = error.message;
      } else {
        switch (error.code) {
          case "auth/invalid-email":
            errorMessage = "অবৈধ ইমেইল";
            break;
          case "auth/user-disabled":
            errorMessage = "এই একাউন্ট নিষ্ক্রিয় করা হয়েছে";
            break;
          case "auth/user-not-found":
            errorMessage = "এই ইমেইলে কোনো একাউন্ট নেই";
            break;
          case "auth/wrong-password":
            errorMessage = "ভুল পাসওয়ার্ড";
            break;
          case "auth/email-not-verified":
            errorMessage =
              "ইমেইল ভেরিফাই করা হয়নি। অনুগ্রহ করে আপনার ইমেইল চেক করুন।";
            break;
          default:
            errorMessage = error.message;
        }
      }

      dispatch(setError(errorMessage));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
    } catch (error) {
      dispatch(setError("লগআউট করতে সমস্যা হয়েছে"));
    }
  };

  // Listen to auth state changes
  const initAuthListener = useCallback(() => {
    return onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          const userData = userDoc.data();

          dispatch(
            setUser({
              uid: user.uid,
              email: user.email,
              name: user.displayName,
              ...userData,
            })
          );
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        dispatch(setError(error.message));
      } finally {
        dispatch(setLoading(false));
      }
    });
  }, [dispatch]);

  const updateUserProfile = async ({ name, photoFile }) => {
    try {
      if (!auth.currentUser) {
        throw new Error("ব্যবহারকারী লগইন অবস্থায় নেই");
      }

      dispatch(setLoading(true));
      let photoURL = user?.photoURL;

      if (photoFile) {
        // Upload to Cloudinary instead of Firebase Storage
        photoURL = await uploadToCloudinary(photoFile);
      }

      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoURL,
      });

      await setDoc(
        doc(db, "users", auth.currentUser.uid),
        {
          name,
          photoURL,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );

      dispatch(
        setUser({
          ...user,
          name,
          photoURL,
        })
      );

      return { success: true };
    } catch (error) {
      console.error("Profile update error:", error);
      dispatch(setError(error.message));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const updateUserPassword = async (currentPassword, newPassword) => {
    try {
      dispatch(setLoading(true));
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        currentPassword
      );
      await reauthenticateWithCredential(auth.currentUser, credential);
      await updatePassword(auth.currentUser, newPassword);
    } catch (error) {
      dispatch(setError(error.message));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const resendVerificationEmail = async () => {
    try {
      if (!auth.currentUser) throw new Error("ব্যবহারকারী লগইন অবস্থায় নেই");

      await sendEmailVerification(auth.currentUser, {
        url: window.location.origin + "/login",
        handleCodeInApp: true,
      });

      // Sign out after sending verification email
      await signOut(auth);

      return { success: true };
    } catch (error) {
      console.error("Verification email error:", error);
      throw new Error("ভেরিফিকেশন ইমেইল পাঠাতে সমস্যা হয়েছে");
    }
  };

  return {
    signUp,
    signIn,
    logOut,
    initAuthListener,
    updateUserProfile,
    updateUserPassword,
    resendVerificationEmail,
  };
};
