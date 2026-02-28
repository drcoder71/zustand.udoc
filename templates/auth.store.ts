import { create } from "zustand";

interface IUser {
  fullName: string;
  phoneNumber: string;
  age: number;
}

interface IUserStore {
  user: IUser | null;
  setUser: (user: IUser) => void;
  clearUser: () => void;
}

export const useAuthStore = create<IUserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
