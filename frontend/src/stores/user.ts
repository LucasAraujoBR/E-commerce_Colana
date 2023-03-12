import { create } from "zustand";
import { User } from "../types/user";

type State = {
  user: User | undefined;
  addUser: (user: User) => void;
};

const useUser = create<State>((set) => ({
  user: undefined,
  addUser: (user: User) =>
    set(() => ({
      user,
    })),
}));

export default useUser;
