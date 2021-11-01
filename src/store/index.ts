import { atom } from "jotai";
import { User } from "../types/User";

export const userAtom = atom<User | undefined>(undefined);
