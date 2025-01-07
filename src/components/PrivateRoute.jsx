import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";
import { useToast } from "../contexts/ToastContext";

const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useSelector((state) => state.auth);
  const location = useLocation();
  const { showToast } = useToast();

  useEffect(() => {
    if (!isLoading && !user) {
      showToast("অনুগ্রহ করে প্রথমে লগইন করুন", "error");
    }
  }, [user, isLoading, showToast]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!user) {
    // Redirect to login while saving the attempted location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
