import { useDispatch, useSelector } from "react-redux";
import { db } from "../config/firebase";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  getDocs,
} from "firebase/firestore";
import {
  setTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  setLoading,
  setError,
} from "../store/slices/todoSlice";
import { useCallback } from "react";

export const useTodos = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const todosState = useSelector((state) => state.todos);

  const todos = todosState?.todos || [];
  const isLoading = todosState?.isLoading || false;
  const error = todosState?.error || null;

  const fetchTodos = useCallback(async () => {
    try {
      dispatch(setLoading(true));

      if (!user?.uid) {
        dispatch(setError("ইউজার আইডি পাওয়া যায়নি"));
        return;
      }

      const todosRef = collection(db, "todos");
      const q = query(
        todosRef,
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc")
      );

      const querySnapshot = await getDocs(q);
      const fetchedTodos = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      dispatch(setTodos(fetchedTodos));
    } catch (error) {
      if (error.message?.includes("requires an index")) {
        dispatch(
          setError("ডাটাবেস ইনডেক্স তৈরি হচ্ছে, কিছুক্ষণ অপেক্ষা করুন।")
        );
      } else {
        dispatch(setError("টুডু লোড করতে সমস্যা হয়েছে"));
      }
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, user?.uid]);

  const createTodo = useCallback(
    async ({ title, description, dueDate, priority }) => {
      try {
        dispatch(setLoading(true));
        const todoData = {
          userId: user.uid,
          title,
          description,
          dueDate,
          priority,
          status: "pending",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        const docRef = await addDoc(collection(db, "todos"), todoData);
        const newTodo = { id: docRef.id, ...todoData };
        dispatch(addTodo(newTodo));
        return { success: true, todo: newTodo };
      } catch (error) {
        dispatch(setError("টুডু তৈরি করতে সমস্যা হয়েছে"));
        throw error;
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch, user?.uid]
  );

  const updateTodoStatus = useCallback(
    async (todoId, status) => {
      try {
        dispatch(setLoading(true));
        const todoRef = doc(db, "todos", todoId);
        const updateData = {
          status,
          updatedAt: new Date().toISOString(),
        };
        await updateDoc(todoRef, updateData);

        const currentTodo = todos.find((todo) => todo.id === todoId);
        const updatedTodo = { ...currentTodo, ...updateData };
        dispatch(updateTodo(updatedTodo));
        return { success: true };
      } catch (error) {
        dispatch(setError("টুডু আপডেট করতে সমস্যা হয়েছে"));
        throw error;
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch, todos]
  );

  const removeTodo = useCallback(
    async (todoId) => {
      try {
        dispatch(setLoading(true));
        await deleteDoc(doc(db, "todos", todoId));
        dispatch(deleteTodo(todoId));
        return { success: true };
      } catch (error) {
        dispatch(setError("টুডু ডিলিট করতে সমস্যা হয়েছে"));
        throw error;
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  return {
    todos,
    isLoading,
    error,
    fetchTodos,
    createTodo,
    updateTodoStatus,
    removeTodo,
  };
};
