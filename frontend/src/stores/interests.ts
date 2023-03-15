import { create } from "zustand";
import { Interest } from "../types";

type State = {
  allInterests: Interest[];
  addAllInterests: (interests: Interest[]) => void;
  myInterests: Interest[];
  addMyInterests: (interests: Interest[]) => void;
};

const useInterest = create<State>((set) => ({
  allInterests: [],
  addAllInterests: (allInterests: Interest[]) =>
    set(() => ({
      allInterests,
    })),
  myInterests: [],
  addMyInterests: (myInterests: Interest[]) =>
    set(() => ({
      myInterests,
    })),
}));

export default useInterest;
