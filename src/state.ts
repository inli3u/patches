import { createContext } from 'preact';
import { signal, Signal } from '@preact/signals';
import { useContext } from "preact/hooks";

// export type PatchStateI = Record<string, Signal<unknown>>;

interface AppState {
  patch: Signal<any>
}

export const state: AppState = createAppState();
export const AppState = createContext<AppState>(state);

function createAppState() {
  return {
    patch: signal(undefined),
  };
}

export function useAppState() {
  return useContext(AppState);
}