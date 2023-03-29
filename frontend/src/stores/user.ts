import { create } from 'zustand';
import { User } from '../types/user';

type State = {
  user: User | undefined;
  addUser: (user: User | undefined) => void;
  addIsOwner: (isOwner: boolean | undefined) => void;
  isOwner: boolean | undefined;
};

const useUser = create<State>((set) => ({
  isOwner: undefined,
  addIsOwner: (isOwner: boolean | undefined) =>
    set(() => ({
      isOwner,
    })),
  user: undefined,
  addUser: (user: User | undefined) =>
    set(() => ({
      user,
    })),
}));

export default useUser;
