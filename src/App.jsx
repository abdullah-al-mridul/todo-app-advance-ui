import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
import { useAuth } from "./hooks/useAuth";
import { useToast } from "./contexts/ToastContext";
import LogoutConfirmationModal from "./components/LogoutConfirmationModal";
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Analytics from "./pages/Analytics";
import Search from "./pages/Search";
import Account from "./pages/Account";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ToastProvider } from "./contexts/ToastContext";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "./store/slices/authSlice";
import { TodoProvider } from "./contexts/TodoContext";
import AddTodoModal from "./components/AddTodoModal";
import { useWindowDimensions } from "./hooks/useWindowDimensions";
import { clearTodos } from "./store/slices/todoSlice";
import ProfileSettingsModal from "./components/ProfileSettingsModal";
import ChangePasswordModal from "./components/ChangePasswordModal";

const AppContent = () => {
  const { initAuthListener, logOut } = useAuth();
  const { showToast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);

  useEffect(() => {
    dispatch(setLoading(true));
    const unsubscribe = initAuthListener();

    return () => {
      unsubscribe?.();
      dispatch(setLoading(false));
    };
  }, [initAuthListener, dispatch]);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logOut();
      dispatch(clearTodos());
      showToast("সফলভাবে লগ আউট হয়েছে", "success");
      setIsLogoutModalOpen(false);
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
      showToast("লগ আউট করতে সমস্যা হয়েছে", "error");
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleOpenProfileModal = () => setIsProfileModalOpen(true);
  const handleOpenPasswordModal = () => setIsChangePasswordModalOpen(true);

  useWindowDimensions();

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          element={
            <PrivateRoute>
              <Layout
                onLogoutClick={() => setIsLogoutModalOpen(true)}
                onAddTodoClick={() => setIsAddModalOpen(true)}
                onOpenProfileModal={handleOpenProfileModal}
                onOpenPasswordModal={handleOpenPasswordModal}
              />
            </PrivateRoute>
          }
        >
          <Route
            index
            element={<Home onAddTodoClick={() => setIsAddModalOpen(true)} />}
          />
          <Route path="analytics" element={<Analytics />} />
          <Route path="search" element={<Search />} />
          <Route
            path="account"
            element={
              <Account
                onLogoutClick={() => setIsLogoutModalOpen(true)}
                onOpenProfileModal={handleOpenProfileModal}
                onOpenPasswordModal={handleOpenPasswordModal}
              />
            }
          />
        </Route>
      </Routes>

      <LogoutConfirmationModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
        isLoading={isLoggingOut}
      />

      <AddTodoModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        className="animate-modal-fade-in"
      />

      <ProfileSettingsModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        user={user}
      />

      <ChangePasswordModal
        isOpen={isChangePasswordModalOpen}
        onClose={() => setIsChangePasswordModalOpen(false)}
      />
    </>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastProvider>
          <TodoProvider>
            <BrowserRouter>
              <AppContent />
            </BrowserRouter>
          </TodoProvider>
        </ToastProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
