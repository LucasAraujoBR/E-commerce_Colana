import { create } from "zustand";

const useUser = create((set) => ({
  user: undefined,
  addUser: (user: any) =>
    set(() => ({
      user,
    })),
}));

export default useUser;
