import { TypedUseSelectorHook, useSelector, useStore } from "react-redux";
import { RootState } from "./";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore = useStore<RootState>
