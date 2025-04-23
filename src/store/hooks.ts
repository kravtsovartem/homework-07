import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { ActionsType } from "./actions";
import { RootState } from "./";

export const useAppDispatch = useDispatch<ThunkDispatch<RootState, void, ActionsType>>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore = useStore<RootState>
