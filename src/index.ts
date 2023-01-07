
import { signal } from '@preact/signals';
import { parse } from 'yaml';
import { mount, patchState } from './components/view';
import { mountLibrary } from './components/Library';
import library from '../db/library';
import { state } from './state';

declare global {
  interface Window { Entry: any; }
}

window.Entry = {
  editor() {
    mount();

    const $patchSrc = document.getElementById('patch-src');
    function getPatchSrc() {
      return ($patchSrc as HTMLTextAreaElement)?.value ?? '';
    }

    const update = () => {
      const src = getPatchSrc();
      const patch = parse(src);
      window['patch'] = patch;

      for (let key of Object.keys(patch.patch)) {
        //displayPatchValue(key, patch.patch[key]);
        if (!patchState[key]) {
          patchState[key] = signal(undefined);
        }
        patchState[key].value = patch.patch[key];
      }
    }

    $patchSrc.addEventListener('keyup', () => {
      update();
    });
    update();
  },

  async viewer() {
    mountLibrary();


    // const setPatchState = (patch: any) => {
    //   for (let key of Object.keys(patch.patch)) {
    //     //displayPatchValue(key, patch.patch[key]);
    //     if (!patchState[key]) {
    //       patchState[key] = signal(undefined);
    //     }
    //     patchState[key].value = patch.patch[key];
    //   }
    // }

    console.log('viewer')
    const patch = library[0];
    window['patch'] = patch;
    state.patch.value = patch;
    console.log(state.patch.value);

    // setPatchState(patch);
  }
};
