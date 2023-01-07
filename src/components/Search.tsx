import { createContext, h, Fragment, render } from 'preact';
import { signal, Signal } from '@preact/signals';
import Microbrute from '../devices/microbrute/view';
import createState from '../devices/microbrute/state';
import { AppState, state, useAppState } from '../state';
import library from '../../db/library';


export default function Search() {
//   const patchIndex = 0;
//   const { patch } = useAppState();
//   console.log('render Library', patch);

// 5424 1813 9574 5834
// 01 25
  const app = useAppState();
  const handleClick = (e, index) => {
    e.preventDefault();
    app.patch.value = library[index];
  };

  return <>
    Microbrute Patches
    <ul>
      {library.map((item, i) => <li><a href="#" onClick={(e) => handleClick(e, i)}>{item.name}</a></li>)}
    </ul>
  </>;
}
