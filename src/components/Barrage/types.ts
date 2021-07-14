import { Ref } from "vue";

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

export interface Text {
  id: string | number;
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

export interface TrackHandlers {
  getTracks: () => Tracks;
  pushTracks: () => void;
  cleanupTracks: () => void;
}

export enum RENDER_STATUS_ENUM {
  PENDING = "pending",
  DONE = "done",
}
export type RenderStatus = RENDER_STATUS_ENUM.PENDING | RENDER_STATUS_ENUM.DONE;
