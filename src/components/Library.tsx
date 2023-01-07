import { createContext, h, Fragment, render } from 'preact';
import { signal, Signal } from '@preact/signals';
import Microbrute from '../devices/microbrute/view';
import createState from '../devices/microbrute/state';
import { AppState, state, useAppState } from '../state';
import Search from './Search';

export function mountLibrary() {
  render(
    <AppState.Provider value={state}>
      <Library />
    </AppState.Provider>
  , document.getElementById('device'));
}

export default function Library() {
  const { patch } = useAppState();

  return <>
    <Search />
    <Microbrute />
    <h2>{patch.value?.name}</h2>
    <div>{patch.value?.notes}</div>
  </>;
}
