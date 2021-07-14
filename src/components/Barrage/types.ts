import Bullet from "./core/bullet";

/**
 * Props types
 */
export type FontSizePropType = string | number;
export enum AREA_ENUM {
  SMALL = "small",
  HALF = "half",
  MOST = "most",
  FULL = "full",
}
export type AreaPropType =
  | AREA_ENUM.SMALL
  | AREA_ENUM.HALF
  | AREA_ENUM.MOST
  | AREA_ENUM.FULL;

/**
 * setup & common types
 */
export interface Size {
  width: number;
  height: number;
}

export interface OriginBullet {
  id: string | number;
  value: string | number;
  data?: any;
}

export interface AnimationWithCustomParams extends Animation {
  appeard?: boolean;
}

export type Tracks = Array<Bullet[]>;

export interface TrackHandlers {
  getTracks: () => Tracks;
  pushTracks: () => void;
}

export enum RENDER_STATUS_ENUM {
  PENDING = "pending",
  DONE = "done",
}
export type RenderStatus = RENDER_STATUS_ENUM.PENDING | RENDER_STATUS_ENUM.DONE;
