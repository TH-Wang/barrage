import { reactive, Ref, watch } from "vue";
import { getQueue } from "../core/sheduler";
import { Tracks, Bullet, TrackHandlers } from "../types";

interface UseTracksResults extends TrackHandlers {
  tracks: Tracks;
}
type UseTracks = (rows: Ref<number>) => UseTracksResults;

// 初始化轨道数据格式
const initTracks = (count: number): Tracks => {
  const initTrack = [];
  for (let i = 0; i < count; i++) {
    initTrack.push([]);
  }
  return initTrack;
};

const useTracks: UseTracks = (rows) => {
  const initTrack: Tracks = initTracks(rows.value);
  const tracks = reactive<Tracks>(initTrack);

  // 获取弹幕轨道
  const getTracks = (): Tracks => {
    return tracks;
  };

  // 推送新弹幕到弹幕轨道
  const pushTracks = () => {
    for (let i = 0; i < rows.value; i++) {
      const track: Array<Bullet> = tracks[i];
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
  const cleanupTracks = () => {
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

  // 观察rows的变化，如果轨道数量不足则立即添加
  watch(
    rows,
    (val: number) => {
      let len = tracks.length;
      if (val > len) {
        while (val > len) {
          tracks.push([]);
          len++;
        }
      }
    },
    { immediate: true }
  );

  return { tracks, getTracks, pushTracks, cleanupTracks };
};

export default useTracks;
