import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (userData) => set({ user: userData }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user-storage", // ชื่อ key ที่ใช้เก็บใน localStorage
      getStorage: () => localStorage, // ค่า default ก็ localStorage อยู่แล้ว
    }
  )
);

export default useUserStore;
