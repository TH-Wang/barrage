/**
 * Props types
 */
export type FontSizePropType = string | number;
export enum AREA {
  SMALL = "small",
  HALF = "half",
  MOST = "most",
  FULL = "full",
}
export type AreaPropType = AREA.SMALL | AREA.HALF | AREA.MOST | AREA.FULL;

/**
 * setup & common types
 */
export interface Size {
  width: number;
  height: number;
}

export interface Text {
  id: number;
  value: string | number;
}

export interface AnimationWithCustomParams extends Animation {
  appeard?: boolean;
}

export interface Bullet {
  data: Text;
  animate: AnimationWithCustomParams | null;
}

export type Tracks = Array<Bullet[]>;
