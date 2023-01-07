import { Control, ControlValueRange, DeviceSchema, option, ui, range, patchOut, patchIn } from '../base';

const standardKnob: ControlValueRange = {
  type: 'range',
  min: 0,
  max: 18,
} as const;

export const microbrute: DeviceSchema = {
  name: 'Microbrute',
  controls: [
    // {
    //   name: 'octave',
    //   value: option(['-2', '-1', '0', '1', '2']),
    //   ui: ui('toggle', 5, 5),
    // },
    {
      name: 'osc.sub',
      value: standardKnob,
      ui: ui('knob', 25, 7.25),
    },
    {
      name: 'osc.ultrasaw',
      value: standardKnob,
      ui: ui('knob', 32.5, 7.25),
    },
    {
      name: 'osc.pulsewidth',
      value: standardKnob,
      ui: ui('knob', 40, 7.25),
    },
    {
      name: 'osc.metalizer',
      value: standardKnob,
      ui: ui('knob', 47.5, 7.25),
    },
    {
      name: 'osc.overtone',
      value: standardKnob,
      ui: ui('knob', 25, 15.5),
    },
    {
      name: 'osc.saw',
      value: standardKnob,
      ui: ui('knob', 32.5, 15.5),
    },
    {
      name: 'osc.square',
      value: standardKnob,
      ui: ui('knob', 40, 15.5),
    },
    {
      name: 'osc.triangle',
      value: standardKnob,
      ui: ui('knob', 47.5, 15.5),
    },
    {
      name: 'filter.cutoff',
      value: standardKnob,
      ui: ui('knob', 55, 7.25),
    },
    {
      name: 'filter.res',
      value: standardKnob,
      ui: ui('knob', 62.75, 7.25),
    },
    {
      name: 'filter.brute',
      value: standardKnob,
      ui: ui('knob', 70.25, 7.25),
    },
    {
      name: 'filter.mode',
      value: option(['HP', 'BP', 'LP']),
      ui: ui('toggle', 55, 15.5),
    },
    {
      name: 'filter.env',
      value: standardKnob,
      ui: ui('knob', 62.75, 15.5),
    },
    {
      name: 'filter.kbd',
      value: standardKnob,
      ui: ui('knob', 70.25, 15.5),
    },
    {
      name: 'controls.glide',
      value: standardKnob,
      ui: ui('knob', 25, 26),
    },
    {
      name: 'controls.mod',
      value: option(['lfo', 'cutoff']),
      ui: ui('toggle', 25, 32.5),
    },
    {
      name: 'lfo.amount',
      value: standardKnob,
      ui: ui('knob', 32.5, 26),
    },
    {
      name: 'lfo.rate',
      value: standardKnob,
      ui: ui('knob', 40, 26),
    },
    {
      name: 'lfo.wave',
      value: option(['square', 'saw', 'triangle']),
      ui: ui('toggle', 32.5, 32.5),
    },
    {
      name: 'lfo.sync',
      value: option(['seq', 'free']),
      ui: ui('toggle', 40, 32.5),
    },
    {
      name: 'env.amount',
      value: standardKnob,
      ui: ui('knob', 47.5, 26),
    },
    {
      name: 'env.vca',
      value: option(['env', 'gate']),
      ui: ui('toggle', 47.5, 32.5),
    },
    {
      name: 'env.attack',
      value: range(0, 20),
      ui: ui('fader', 55.6, 26.25),
    },
    {
      name: 'env.decay',
      value: range(0, 20),
      ui: ui('fader', 60.7, 26.25),
    },
    {
      name: 'env.sustain',
      value: range(0, 20),
      ui: ui('fader', 65.7, 26.25),
    },
    {
      name: 'env.release',
      value: range(0, 20),
      ui: ui('fader', 70.8, 26.25),
    },

    {
      name: 'patch.envOut',
      value: patchOut(),
      ui: ui('patch', 78.6, 5.95),
    },
    {
      name: 'patch.lfoOut',
      value: patchOut(),
      ui: ui('patch', 78.6, 9.6),
    },
    {
      name: 'patch.metalIn',
      value: patchIn(),
      ui: ui('patch', 82.1, 5.95),
    },
    {
      name: 'patch.sawIn',
      value: patchIn(),
      ui: ui('patch', 85.5, 5.95),
    },
    {
      name: 'patch.subIn',
      value: patchIn(),
      ui: ui('patch', 89, 5.95),
    },
    {
      name: 'patch.pitchIn',
      value: patchIn(),
      ui: ui('patch', 82.1, 9.6),
    },
    {
      name: 'patch.filterIn',
      value: patchIn(),
      ui: ui('patch', 85.5, 9.6),
    },
    {
      name: 'patch.pwmIn',
      value: patchIn(),
      ui: ui('patch', 89, 9.6),
    },
  ],
} as const;

export const controlMap = new Map<string, Control>();
microbrute.controls.forEach((control) => controlMap.set(control.name, control));

export const keys = microbrute.controls.map((item) => item.name);
export type Keys = typeof microbrute['controls'][number]['name'];