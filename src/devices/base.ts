export interface ControlValueOption {
  type: 'option';
  options: string[];
}

export interface ControlValueRange {
  type: 'range';
  min: number;
  max: number;
}

export interface ControlValuePatchOut {
  type: 'patch-out';
  to?: string;
}

export interface ControlValuePatchIn {
  type: 'patch-in';
  from?: string;
}

export type ControlValue = ControlValueOption | ControlValueRange | ControlValuePatchOut | ControlValuePatchIn;

export interface ControlUi {
  type: string;
  x: number;
  y: number;
}

export interface Control {
  name: string;
  value: ControlValue;
  ui?: ControlUi;
}

export interface DeviceSchema {
  readonly name: string;
  readonly controls: readonly Control[];
}

export const range = (min: number, max: number): ControlValueRange => ({
  type: 'range',
  min,
  max,
});

export const option = (options: string[]): ControlValueOption => ({
  type: 'option',
  options,
});

export const patchOut = (): ControlValuePatchOut => ({
  type: 'patch-out',
});

export const patchIn = (): ControlValuePatchIn => ({
  type: 'patch-in',
});

export function ui(type: string, x: number, y: number): ControlUi {
  return { type, x, y };
}
