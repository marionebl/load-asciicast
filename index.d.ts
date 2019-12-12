declare module "load-asciicast" {
  export interface LoadOptions {
    fps?: number;
    height?: number;
    idle?: number;
    width?: number;
  }

  export interface Attributes {
    fg?: number;
    bg?: boolean;
    bold?: boolean;
    inverse?: boolean;
    underline?: boolean;
  }

  export type Char = readonly [number, Attributes];

  export type Line = Char[];

  export interface Coordinate {
    x: number;
    y: number;
  }

  export interface Cursor extends Coordinate {
    visible: boolean;
  }

  export interface VersionZeroFrame {
    lines: Line[];
    cursor: Cursor;
  }

  export interface FrameSave {
    cursor: Coordinate;
    "char-attrs": Attributes;
    "origin-mode": boolean;
    "auto-wrap-mode": boolean;
  }

  export interface VersionOneFrame {
    "parser-state": "ground";
    "parser-params": number[];
    "parser-intermediates": number[];
    screen: {
      width: number;
      height: number;
      "top-margin": number;
      "bottom-margin": number;
      tabs: number[];
      cursor: Cursor;
      "char-attrs": Attributes;
      "charset-fn": (arg: any, ...args: any[]) => unknown;
      "insert-mode": boolean;
      "auto-wrap-mode": boolean;
      "new-line-mode": boolean;
      "next-print-wraps": boolean;
      "origin-mode": boolean;
      buffer: "primary";
      lines: Line[];
      saved: FrameSave;
      "other-buffer-lines": null;
      "other-buffer-saved": FrameSave;
    };
  }

  export type Frame<T> = readonly [number, T];

  export interface CastEnvelope<V, T> {
    version: V;
    width: number;
    height: number;
    duration: number;
    frames: Frame<T>[];
  }

  export type CastFrame = VersionZeroFrame | VersionOneFrame;

  export type Cast =
    | CastEnvelope<0, VersionZeroFrame>
    | CastEnvelope<1 | 2, VersionOneFrame>;

  export function load(data: string, options: LoadOptions): Cast;
}
