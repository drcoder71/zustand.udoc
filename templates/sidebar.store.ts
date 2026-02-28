import { create } from "zustand";

export type SidebarType = "cover" | "short" | "close" | string;

export interface ISidebar {
  sidebar: SidebarType;
  changeSidebar: (sidebar: SidebarType) => void;
  closeSidebar: () => void;
}

export const useSidebar = create<ISidebar>(
  persist(
    (set) => ({
      sidebar: "cover",

      changeSidebar: (sidebar) => set({ sidebar }),
      closeSidebar: () => set({ sidebar: "close" }),
    }),
    { name: "sidebar-store" },
  ),
);
