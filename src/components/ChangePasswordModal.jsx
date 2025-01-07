import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../contexts/ToastContext";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "../styles/animations.css";

const ChangePasswordModal = ({ isOpen, onClose }) => {
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const { updateUserPassword } = useAuth();
  const { showToast } = useToast();

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
    currentPassword: Yup.string()
      .min(6, "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে")
      .required("বর্তমান পাসওয়ার্ড প্রয়োজন"),
    newPassword: Yup.string()
      .min(6, "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে")
      .notOneOf(
        [Yup.ref("currentPassword")],
        "নতুন পাসওয়ার্ড আগের মতো হতে পারবে না"
      )
      .required("নতুন পাসওয়ার্ড প্রয়োজন"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "পাসওয়ার্ড মিলছে না")
      .required("পাসওয়ার্ড নিশ্চিত করুন"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await updateUserPassword(values.currentPassword, values.newPassword);
      showToast("পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে", "success");
      resetForm();
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

        <h3 className="text-lg font-medium text-text-primary mb-6 flex items-center">
          <svg
            className="w-5 h-5 mr-2 text-accent-purple"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
            />
          </svg>
          পাসওয়ার্ড পরিবর্তন
        </h3>

        <Formik
          initialValues={{
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label className="block text-sm text-text-secondary mb-1">
                  বর্তমান পাসওয়ার্ড
                </label>
                <Field
                  type="password"
                  name="currentPassword"
                  className={`w-full bg-dark-700/50 rounded-xl px-4 py-3 text-text-primary border border-dark-600/50 outline-none transition-all ${
                    errors.currentPassword && touched.currentPassword
                      ? "border-red-500/50 focus:border-red-500"
                      : "focus:border-accent-purple"
                  }`}
                />
                {errors.currentPassword && touched.currentPassword && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.currentPassword}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm text-text-secondary mb-1">
                  নতুন পাসওয়ার্ড
                </label>
                <Field
                  type="password"
                  name="newPassword"
                  className={`w-full bg-dark-700/50 rounded-xl px-4 py-3 text-text-primary border border-dark-600/50 outline-none transition-all ${
                    errors.newPassword && touched.newPassword
                      ? "border-red-500/50 focus:border-red-500"
                      : "focus:border-accent-purple"
                  }`}
                />
                {errors.newPassword && touched.newPassword && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.newPassword}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm text-text-secondary mb-1">
                  পাসওয়ার্ড নিশ্চিত করুন
                </label>
                <Field
                  type="password"
                  name="confirmPassword"
                  className={`w-full bg-dark-700/50 rounded-xl px-4 py-3 text-text-primary border border-dark-600/50 outline-none transition-all ${
                    errors.confirmPassword && touched.confirmPassword
                      ? "border-red-500/50 focus:border-red-500"
                      : "focus:border-accent-purple"
                  }`}
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.confirmPassword}
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-accent-purple to-accent-pink hover:from-accent-purple/90 hover:to-accent-pink/90 text-white py-3 rounded-xl font-medium transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 mt-6"
              >
                {isSubmitting ? "পরিবর্তন হচ্ছে..." : "পরিবর্তন করুন"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
