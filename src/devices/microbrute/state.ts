import { signal, Signal } from '@preact/signals';
import { microbrute } from './schema';

export default function createState(): Record<string, Signal> {
  const state = {};
  for (let c of microbrute.controls) {
    const init = c.value.type === 'option' ? '' : 0;
    state[c.name] = signal(init);
  }
  return state;
}