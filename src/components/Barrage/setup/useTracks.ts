import { reactive, Ref, watch } from "vue";
import Bullet from "../core/bullet";
import { getQueue } from "../core/sheduler";
import { head, last } from "../utils/array";
import { Tracks, TrackHandlers } from "../types";

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

// 从轨道中清理已经完成动画的弹幕
const cleanup = (id: string | number, tracks: Tracks) => {
  const len = tracks.length;
  for (let i = 0; i < len; i++) {
    const track: Array<Bullet> = tracks[i];
    if (!track.length) continue;
    for (let j = 0; j < track.length; j++) {
      const bullet = track[j];
      if (bullet.id === id && bullet.animation?.playState === "finished") {
        track.splice(j, 1);
        break;
      }
    }
  }
};

// 调用该方法，通过传入的 id 参数，在轨道中的删除弹幕
export let cleanupBulletInTracks: (id: string | number) => void = () => void 0;

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
      if (!track.length || last<Bullet>(track)?.appeard) {
        const headBullet: Bullet | undefined = head<Bullet>(getQueue());
        if (headBullet) track.push(headBullet);
        break;
      }
    }
  };

  // 初始化清理弹幕函数
  cleanupBulletInTracks = (id: number | string) => {
    cleanup(id, tracks);
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

  return { tracks, getTracks, pushTracks };
};

export default useTracks;
