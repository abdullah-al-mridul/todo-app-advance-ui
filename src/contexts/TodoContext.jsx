import React, { createContext, useContext, useState } from "react";
import TodoDetailsModal from "../components/TodoDetailsModal";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);
  const [onDeleteConfirm, setOnDeleteConfirm] = useState(null);

  const openTodoDetails = (todo) => {
    setSelectedTodo(todo);
    setIsDetailsModalOpen(true);
  };

  const closeTodoDetails = () => {
    setIsDetailsModalOpen(false);
    setTimeout(() => {
      setSelectedTodo(null);
    }, 200);
  };

  const openDeleteModal = (todo, onConfirm) => {
    setTodoToDelete(todo);
    setOnDeleteConfirm(() => onConfirm);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setTimeout(() => {
      setTodoToDelete(null);
      setOnDeleteConfirm(null);
    }, 200);
  };

  const handleDeleteConfirm = async () => {
    if (onDeleteConfirm) {
      await onDeleteConfirm();
      closeDeleteModal();
    }
  };

  return (
    <TodoContext.Provider
      value={{
        openTodoDetails,
        closeTodoDetails,
        openDeleteModal,
        closeDeleteModal,
      }}
    >
      {children}
      <TodoDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={closeTodoDetails}
        todo={selectedTodo}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteConfirm}
        todoTitle={todoToDelete?.title}
      />
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }
  return context;
};
