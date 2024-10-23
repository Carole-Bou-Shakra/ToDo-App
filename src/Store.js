import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useTodoStore = create(
  persist(
    (set) => ({
      todoItems: [], // Initial empty todoItems array
      doneItems: [], // Initial empty doneItems array

      // Function to add a new todo item
      addTodoItem: (newItem) => set((state) => ({
        todoItems: [...state.todoItems, newItem], // Add new item to the existing array
      })),

      // Function to mark an item as done
      markAsDone: (id) => set((state) => {
        const updatedTodoItems = state.todoItems.filter((item) => item.id !== id);
        const doneItem = state.todoItems.find((item) => item.id === id);
        return {
          todoItems: updatedTodoItems,
          doneItems: [...state.doneItems, doneItem],
        };
      }),

      // Function to update a todo item
      updateTodoItem: (updatedItem) => set((state) => ({
        todoItems: state.todoItems.map((item) =>
          item.id === updatedItem.id ? updatedItem : item
        ),
      })),

      // Function to delete a todo item
      deleteTodoItem: (id) => set((state) => ({
        todoItems: state.todoItems.filter((item) => item.id !== id),
      })),
    }),
    {
      name: 'todo-store', // Unique name for the local storage key
      getStorage: () => localStorage, // Use local storage to persist state
    }
  )
);

export default useTodoStore;
