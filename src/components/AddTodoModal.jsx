import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useTodos } from "../hooks/useTodos";
import { useToast } from "../contexts/ToastContext";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import "../styles/animations.css";
// Import PrimeReact styles
import "primereact/resources/themes/lara-dark-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "../styles/prime-react-custom.css";

const AddTodoSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "টাইটেল খুব ছোট")
    .max(100, "টাইটেল খুব বড়")
    .required("টাইটেল প্রয়োজন"),
  description: Yup.string().max(500, "বর্ণনা খুব বড়"),
  dueDate: Yup.date()
    .nullable()
    .min(
      new Date(new Date().setHours(0, 0, 0, 0)),
      "অতীতের তারিখ দেওয়া যাবে না"
    ),
  priority: Yup.string().oneOf(["high", "medium", "low"]),
});

const priorityOptions = [
  { label: "হাই", value: "high" },
  { label: "মিডিয়াম", value: "medium" },
  { label: "লো", value: "low" },
];

const AddTodoModal = ({ isOpen, onClose, className }) => {
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const { createTodo } = useTodos();
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

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const formattedValues = {
        ...values,
        dueDate: values.dueDate ? values.dueDate.toISOString() : null,
      };

      const result = await createTodo(formattedValues);
      if (result.success) {
        showToast("টুডু সফলভাবে তৈরি হয়েছে", "success");
        resetForm();
        onClose();
      }
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
        } ${className}`}
      >
        <div className="text-center mb-6">
          <h3 className="text-lg font-medium text-text-primary">
            নতুন টুডু তৈরি করুন
          </h3>
        </div>

        <Formik
          initialValues={{
            title: "",
            description: "",
            dueDate: null,
            priority: "medium",
          }}
          validationSchema={AddTodoSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting, setFieldValue, values }) => (
            <Form className="space-y-4">
              <div>
                <label className="block text-sm text-text-secondary mb-1">
                  টাইটেল
                </label>
                <Field
                  type="text"
                  name="title"
                  className={`w-full bg-dark-700/50 rounded-xl px-4 py-3 text-text-primary border border-dark-600/50 outline-none transition-all ${
                    errors.title && touched.title
                      ? "border-red-500/50 focus:border-red-500"
                      : "focus:border-accent-purple"
                  }`}
                />
                {errors.title && touched.title && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.title}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm text-text-secondary mb-1">
                  বর্ণনা
                </label>
                <Field
                  as="textarea"
                  name="description"
                  rows={3}
                  className={`w-full bg-dark-700/50 rounded-xl px-4 py-3 text-text-primary border border-dark-600/50 outline-none transition-all ${
                    errors.description && touched.description
                      ? "border-red-500/50 focus:border-red-500"
                      : "focus:border-accent-purple"
                  }`}
                />
                {errors.description && touched.description && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.description}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm text-text-secondary mb-1">
                  শেষ তারিখ
                </label>
                <Calendar
                  value={values.dueDate}
                  onChange={(e) => {
                    const date = e.value
                      ? new Date(e.value.setHours(0, 0, 0, 0))
                      : null;
                    setFieldValue("dueDate", date);
                  }}
                  dateFormat="dd/mm/yy"
                  className="w-full"
                  showIcon
                  showOnFocus={false}
                  icon="pi pi-calendar"
                  minDate={new Date(new Date().setHours(0, 0, 0, 0))}
                  placeholder="তারিখ নির্বাচন করুন"
                />
                {errors.dueDate && touched.dueDate && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.dueDate}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm text-text-secondary mb-1">
                  প্রায়োরিটি
                </label>
                <Dropdown
                  value={values.priority}
                  onChange={(e) => setFieldValue("priority", e.value)}
                  options={priorityOptions}
                  className="w-full"
                  placeholder="প্রায়োরিটি নির্বাচন করুন"
                />
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-accent-purple to-accent-pink hover:from-accent-purple/90 hover:to-accent-pink/90 text-white py-3 rounded-xl font-medium transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100"
                >
                  {isSubmitting ? "তৈরি হচ্ছে..." : "তৈরি করুন"}
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 bg-dark-700/50 hover:bg-dark-700 text-text-secondary py-3 rounded-xl font-medium transition-all"
                >
                  বাতিল
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddTodoModal;
