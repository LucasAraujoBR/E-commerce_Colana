import { create } from "zustand";
import { User } from "../types/user";

type State = {
  user: User | undefined;
  addUser: (user: User) => void;
  addIsOwner: (isOwner: boolean) => void;
  isOwner: boolean | undefined;
};

const useUser = create<State>((set) => ({
  isOwner: undefined,
  addIsOwner: (isOwner: boolean) =>
    set(() => ({
      isOwner,
    })),
  user: undefined,
  addUser: (user: User) =>
    set(() => ({
      user,
    })),
}));

export default useUser;
