import { createContext, h, render } from 'preact';
import { signal, Signal } from '@preact/signals';
import Microbrute from '../devices/microbrute/view';
import createState from '../devices/microbrute/state';

export type PatchStateI = Record<string, Signal<unknown>>;

export const patchState: PatchStateI = {};
export const PatchState = createContext<PatchStateI>(patchState);

export function mount() {
  render(
    <PatchState.Provider value={patchState}>
      <Microbrute />
    </PatchState.Provider>,
    document.getElementById('device')
  );
}
