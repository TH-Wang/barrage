import { Ref, ref, watch } from "vue";
import { getQueue } from "../core/sheduler";
import {
  Tracks,
  Bullet,
  PushTracks,
  CleanupTracks,
  TrackHandlers,
} from "../types";

type UseTracks = (rows: Ref<number>) => {
  tracks: Ref<Tracks>;
  initTrackHandlers: () => TrackHandlers;
};

// 初始化轨道数据格式
const initTracks = (count: number): Tracks => {
  const initTrack = [];
  for (let i = 0; i < count; i++) {
    initTrack.push([]);
  }
  return initTrack;
};

// 推送新弹幕到弹幕轨道
const pushTracks: PushTracks = (tracks, rows): void => {
  for (let i = 0; i < rows.value; i++) {
    const track: Array<Bullet> = tracks.value[i];
    if (
      !track.length ||
      (track[track.length - 1] as Bullet)?.animate?.appeard
    ) {
      const willPushBullet: Bullet | undefined = getQueue().shift();
      if (willPushBullet) track.push(willPushBullet);
      break;
    }
  }
};

// 清理不需要并且已空闲的弹幕轨道
const cleanupTracks: CleanupTracks = (tracks): void => {
  const len = tracks.value.length;
  for (let i = 0; i < len; i++) {
    const track: Array<Bullet> = tracks.value[i];
    if (!track.length) continue;
    for (let j = 0; j < track.length; j++) {
      const bullet = track[j];
      if (bullet.animate?.playState === "finished") track.shift();
      else break;
    }
  }
};

// 观察rows的变化，如果轨道数量不足则立即添加
const watchRowsChange = (val: number, tracks: Tracks) => {
  let len = tracks.length;
  if (val > len) {
    while (val > len) {
      tracks.push([]);
      len++;
    }
  }
};

const useTracks: UseTracks = (rows) => {
  const initTrack: Tracks = initTracks(rows.value);
  const tracks = ref<Tracks>(initTrack);

  const initTrackHandlers = (): TrackHandlers => {
    return {
      pushTracks: () => pushTracks(tracks, rows),
      cleanupTracks: () => cleanupTracks(tracks),
    };
  };

  watch(
    rows,
    (val) => {
      watchRowsChange(val as unknown as number, tracks.value);
    },
    {
      immediate: true,
    }
  );

  return { tracks, initTrackHandlers };
};

export default useTracks;
