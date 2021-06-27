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
