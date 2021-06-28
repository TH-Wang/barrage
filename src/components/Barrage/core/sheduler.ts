import { Bullet, Tracks } from "../types";

// 缓冲队列
const queue: Array<Bullet> = [];

// 推送到缓冲队列
export const pushQueue = (bullet: Bullet): void => {
  queue.push(bullet);
};

// 推送新弹幕到弹幕轨道
export const pushTracks = (tracks: Tracks, limit: number): void => {
  for (let i = 0; i < limit; i++) {
    const track: Array<Bullet> = tracks[i];
    if (
      !track.length ||
      (track[track.length - 1] as Bullet)?.animate?.appeard
    ) {
      const willPushBullet: Bullet | undefined = queue.shift();
      willPushBullet !== undefined && track.push(willPushBullet);
      break;
    }
  }
};

// 清理队列
export const cleanupTracks = (tracks: Tracks): void => {
  const len = tracks.length;
  for (let i = 0; i < len; i++) {
    const track: Array<Bullet> = tracks[i];
    if (!track.length) continue;
    for (let j = 0; j < track.length; j++) {
      const bullet = track[j];
      if (bullet.animate?.playState === "finished") track.shift();
      else break;
    }
  }
};

export default function sheduler(tracks: Tracks, limit: number): void {
  setInterval(() => {
    pushTracks(tracks, limit);
    cleanupTracks(tracks);
  }, 500);
}
