import { h, Fragment } from 'preact';
import { useContext } from "preact/hooks";
import range from 'lodash/range';
import { Control, ControlValueOption, ControlValueRange } from '../base';
import { microbrute, controlMap } from './schema';
import { PatchState } from '../../components/view';
import { Signal } from '@preact/signals';
import { useAppState } from '../../state';


interface ControlProps<Value> {
  schema: Control,
  value: Value,
}

function Knob({ schema, value }: ControlProps<number>) {
  if (value === undefined) return;
  
  const size = 7;
  
  // determine angle
  const aMin = 30;
  const aMax = 330;
  const aDelta = aMax - aMin;
  const a = value / 20 * aDelta + aMin;

  // determine center / origin
  const x = size / 2 + schema.ui?.x;
  const y = size / 2 + schema.ui?.y;

  // rotate
  const transform = `rotate(${a}, ${x}, ${y})`;

  return <>
    <use xlinkHref="#knob-decor" x={schema.ui?.x} y={schema.ui?.y} width={size} height={size} />
    <use xlinkHref="#knob"       x={schema.ui?.x} y={schema.ui?.y} width={size} height={size} id={schema.name} transform={transform} />
  </>;
}

function Toggle({ schema, value }: ControlProps<string>) {
  if (value === undefined) return;

  console.log(schema.name, value);
  const size = 7;
  const delta = 35 - 20;
  const travelHeight = 60 - delta + 5;
  const s = schema.value as ControlValueOption;
  const i = s.options.findIndex((v) => v === value);
  console.log(i);
  if (i < 0 || i > s.options.length - 1) {
    console.error(`Value out of range:`, schema.name, i);
  }
  const y = i / (s.options.length - 1) * (delta / travelHeight) * size;
  console.log(y);
  return <>
    <use xlinkHref="#toggle-decor" x={schema.ui?.x} y={schema.ui?.y} width={size} height={size} />
    <use xlinkHref="#toggle"       x={schema.ui?.x} y={schema.ui?.y} width={size} height={size} transform={`translate(0, ${y})`} />
  </>;
}

function Fader({ schema, value }: ControlProps<number>) {
  if (value === undefined) return;

  const width = 6;
  const height = 12;
  const travelHeight = 9;
  const s = schema.value as ControlValueRange;
  const y = value / s.max * travelHeight;
  return <g>
    <use xlinkHref="#fader-decor" x={schema.ui?.x} y={schema.ui?.y} width={width} height={height} />
    <use xlinkHref="#fader"       x={schema.ui?.x} y={schema.ui?.y} width={width} height={height} transform={`translate(0, ${-y})`} />
  </g>;
}

function Patch({ schema, value }: ControlProps<string>) {
  const size = 5;
  const half = size / 2;
  return <g>
    <use xlinkHref="#patch-decor" x={schema.ui?.x} y={schema.ui?.y} width={size} height={size} />
  </g>;
}

function PatchOutCable({ schema, value }: ControlProps<string>) {
  const size = 5;
  const half = size / 2;
  let to: Control;
  to = controlMap.get(value);
  console.log('to', value, to);
  const outpos = { x: schema.ui?.x + half, y: schema.ui?.y + half };
  const inpos = { x: to.ui?.x + half, y: to.ui?.y + half };
  return <g className="patch-cable">
    <circle cx={outpos.x} cy={outpos.y} r={size / 10} />
    <circle cx={inpos.x} cy={inpos.y} r={size / 10} />
    <line x1={outpos.x} y1={outpos.y} x2={inpos.x} y2={inpos.y} />
  </g>;
}

function GenericControl({ schema, value }: ControlProps<unknown>) {
  switch (schema.ui.type) {
    case 'toggle': return <Toggle schema={schema} value={value as string} />;
    case 'fader': return <Fader schema={schema} value={value as number} />;
    case 'knob': return <Knob schema={schema} value={value as number} />;
    case 'patch': return <Patch schema={schema} value={value as string} />;
  }
}

function Template() {
  return <>
    <style>
      {`
      #knob-decor line {
        stroke:black;
        stroke-width:1;
      }

      #knob circle {
        fill: white;
        stroke: black;
        stroke-width: 1;
      }
      #knob line {
        stroke: rgb(255,0,0);
        stroke-width: 5;
      }

      #toggle-decor rect {
        fill: none;
        stroke: black;
        stroke-width: 1;
      }
      #toggle circle {
        fill: red;
      }

      #fader-decor .notch {
        stroke: black;
        stroke-width: 2;
      }
      #fader-decor .track {
        stroke: black;
        stroke-width: 5;
        stroke-linecap: round;  
      }
      #fader rect {
        fill: white;
        stroke: black;
        stroke-width: 1;
      }
      #fader line {
        stroke: rgb(255,0,0);
        stroke-width: 5;
      }

      #patch-decor {
        fill: white;
        stroke: black;
        stroke-width: 2;
      }

      .patch-cable circle {
        fill: red;
      }
      .patch-cable line {
        stroke: red;
        stroke-width: 0.5;
        line-cap: round;
      }
      `}
    </style>
    
    <symbol id="knob-decor" viewBox="0 0 100 100">
      <g>
        {range(45, 315 + 1, 15).map((a) => 
          <line x1="50" y1="50" x2="50" y2="100" transform={`rotate(${a}, 50, 50)`} />
        )}
      </g>
    </symbol>

    <symbol id="knob" viewBox="0 0 100 100">
      <g>
        <circle cx="50" cy="50" r="35" />
        <line x1="50" y1="50" x2="50" y2="90" />
      </g>
    </symbol>

    <symbol id="toggle-decor" viewBox="0 0 100 100">
      <rect x="35" y="20" width="30" height="60" rx="15" />
    </symbol>

    <symbol id="toggle" viewBox="0 0 100 100">
      <circle cx="50" cy="35" r="11" />
    </symbol>

    <symbol id="fader-decor" viewBox="0 0 100 200">
      <g>
        {range(0, 20 + 1).map((y) => {
          let offset = 0;
          if (y % 5 === 0) {
            offset += 5
          }
          if (y % 10 === 0) {
            offset += 5;
          }
          const minY = 25
          const notchHeight = 200 - minY * 2;
          const finalY = y / 20 * notchHeight + minY;
          return <line className="notch" x1={20 - offset} y1={finalY} x2="42" y2={finalY} />
        })}
        <line className="track" x1={50} y1={10} x2={50} y2={190} />
      </g>
    </symbol>

    <symbol id="fader" viewBox="0 0 100 200">
      <g>
        <rect x={28} y={155} width={44} height={40} />
        <line x1={30} y1={175} x2={70} y2={175} />
      </g>
    </symbol>

    <symbol id="patch-decor" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="15" />
    </symbol> 
  </>;
}

export default function Microbrute() {
  const { patch } = useAppState();
  const params = patch.value?.params;
  if (!params) return null;

  // Patch outs controls that have a value
  let patcheOuts = microbrute.controls.filter((c) => c.value.type === 'patch-out');
  patcheOuts = patcheOuts.filter((cont) => !!params[cont.name]);

  return (
    <svg viewBox="0 0 100 45">
      {/* <image href="img-dev/minibrute.jpg" width="100" /> */}
      <Template />
      {microbrute.controls.map((schema) => <GenericControl schema={schema} value={params[schema.name]} />)}
      {patcheOuts.map((schema) => <PatchOutCable schema={schema} value={params[schema.name] as string} />)}
    </svg>
  );
}