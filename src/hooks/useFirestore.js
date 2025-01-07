import { useState, useEffect } from "react";
import { db, checkConnection, isFirestoreConnected } from "../config/firebase";
import { collection, doc, onSnapshot, enableNetwork } from "firebase/firestore";

export const useFirestore = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    let mounted = true;
    let retryTimeout;

    const checkFirestoreConnection = async () => {
      if (!mounted) return;

      try {
        const isConnected = await checkConnection();
        setIsOnline(isConnected);
        setIsRetrying(false);
      } catch (error) {
        console.error("Connection check failed:", error);
        setIsOnline(false);

        // Only retry if still mounted
        if (mounted) {
          setIsRetrying(true);
          retryTimeout = setTimeout(checkFirestoreConnection, 5000);
        }
      }
    };

    // Initial check
    checkFirestoreConnection();

    // Network status listener
    const handleNetworkChange = () => {
      if (navigator.onLine) {
        checkFirestoreConnection();
      } else {
        setIsOnline(false);
      }
    };

    window.addEventListener("online", handleNetworkChange);
    window.addEventListener("offline", handleNetworkChange);

    return () => {
      mounted = false;
      clearTimeout(retryTimeout);
      window.removeEventListener("online", handleNetworkChange);
      window.removeEventListener("offline", handleNetworkChange);
    };
  }, []);

  const executeWithRetry = async (operation) => {
    if (!isOnline) {
      setIsRetrying(true);
      await checkConnection();
    }

    try {
      setIsRetrying(true);
      const result = await operation();
      setIsRetrying(false);
      return result;
    } catch (error) {
      console.error("Operation failed:", error);
      throw error;
    } finally {
      setIsRetrying(false);
    }
  };

  return {
    isOnline,
    isRetrying,
    executeWithRetry,
  };
};
