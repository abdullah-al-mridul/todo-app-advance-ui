import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../contexts/ToastContext";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "../styles/animations.css";

const ProfileSettingsModal = ({ isOpen, onClose, user }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(user?.photoURL);
  const { updateUserProfile } = useAuth();
  const { showToast } = useToast();
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsAnimatingOut(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      onClose();
    }, 200);
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "নাম খুব ছোট")
      .max(50, "নাম খুব বড়")
      .required("নাম প্রয়োজন"),
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        showToast("ছবির সাইজ ৫MB এর বেশি হতে পারবে না", "error");
        return;
      }

      // Check file type
      if (!file.type.startsWith("image/")) {
        showToast("শুধুমাত্র ছবি আপলোড করা যাবে", "error");
        return;
      }

      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await updateUserProfile({
        name: values.name,
        photoFile: selectedImage,
      });

      showToast("প্রোফাইল আপডেট সফল হয়েছে", "success");
      onClose();
    } catch (error) {
      showToast(error.message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen && !isAnimatingOut) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm ${
          isAnimatingOut
            ? "animate-modal-backdrop-fade-out"
            : "animate-modal-backdrop-fade-in"
        }`}
        onClick={handleClose}
      />
      <div
        className={`relative bg-dark-800/90 backdrop-blur-md rounded-2xl p-6 border border-dark-600/50 shadow-xl max-w-md w-full mx-4 ${
          isAnimatingOut ? "animate-modal-fade-out" : "animate-modal-fade-in"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-text-tertiary hover:text-text-secondary transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h3 className="text-lg font-medium text-text-primary mb-6">
          প্রোফাইল সেটিংস
        </h3>

        <Formik
          initialValues={{
            name: user?.name || "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="space-y-6">
              {/* Profile Picture */}
              <div className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <div className="w-full h-full rounded-full bg-gradient-to-r from-accent-purple to-accent-pink p-1">
                    <div className="w-full h-full rounded-full bg-dark-800 flex items-center justify-center overflow-hidden">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-4xl font-bold text-accent-purple">
                          {user?.name?.charAt(0)}
                        </span>
                      )}
                    </div>
                  </div>
                  <label className="absolute -bottom-2 -right-2 w-8 h-8 bg-accent-purple rounded-full flex items-center justify-center cursor-pointer hover:bg-accent-pink transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </label>
                </div>
              </div>

              {/* Name Field */}
              <div>
                <label className="block text-sm text-text-secondary mb-1">
                  নাম
                </label>
                <Field
                  type="text"
                  name="name"
                  className={`w-full bg-dark-700/50 rounded-xl px-4 py-3 text-text-primary border border-dark-600/50 outline-none transition-all ${
                    errors.name && touched.name
                      ? "border-red-500/50 focus:border-red-500"
                      : "focus:border-accent-purple"
                  }`}
                />
                {errors.name && touched.name && (
                  <div className="text-red-500 text-xs mt-1">{errors.name}</div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-accent-purple to-accent-pink hover:from-accent-purple/90 hover:to-accent-pink/90 text-white py-3 rounded-xl font-medium transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100"
              >
                {isSubmitting ? "আপডেট হচ্ছে..." : "আপডেট করুন"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ProfileSettingsModal;
