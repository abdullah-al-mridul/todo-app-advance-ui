import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  initializeFirestore,
  collection,
  doc,
  onSnapshot,
  enableNetwork,
  disableNetwork,
  persistentLocalCache,
  persistentMultipleTabManager,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBRx7LUgydMAGeoMg65O6cbvbwS0aRxQ9U",
  authDomain: "todo-app-dark.firebaseapp.com",
  projectId: "todo-app-dark",
  storageBucket: "todo-app-dark.firebasestorage.app",
  messagingSenderId: "624580642735",
  appId: "1:624580642735:web:bf37262b01eefc694a115a",
};

// Initialize Firebase only if it hasn't been initialized already
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

export const auth = getAuth(app);

// Initialize Firestore with optimized settings
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager(),
    cacheSizeBytes: 100 * 1024 * 1024,
  }),
});

// Better connection state management
let isConnected = true;

export const checkConnection = async () => {
  try {
    await enableNetwork(db);
    isConnected = true;
    return true;
  } catch (error) {
    console.error("Connection check failed:", error);
    isConnected = false;
    return false;
  }
};

export const isFirestoreConnected = () => isConnected;

// Initialize connection check
checkConnection();

// Helper function to handle Firestore operations with retry
export const withRetry = async (operation, maxRetries = 3) => {
  let lastError;

  for (let i = 0; i < maxRetries; i++) {
    try {
      if (!isFirestoreConnected()) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        continue;
      }
      return await operation();
    } catch (error) {
      lastError = error;
      if (
        error.code === "unavailable" ||
        error.code === "failed-precondition"
      ) {
        // Wait before retrying (exponential backoff)
        await new Promise((resolve) =>
          setTimeout(resolve, Math.pow(2, i) * 1000)
        );
        continue;
      }
      throw error; // Throw non-connectivity errors immediately
    }
  }

  throw lastError; // If we've exhausted retries
};

// Helper function to safely execute Firestore operations
export const executeFirestoreOperation = async (operation) => {
  try {
    return await withRetry(operation);
  } catch (error) {
    console.error("Firestore operation failed:", error);
    throw error;
  }
};
