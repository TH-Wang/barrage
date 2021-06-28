import { Ref, ref, watch } from "vue";
import { Tracks } from "../types";

type UseTracks = (rows: Ref<number>) => { tracks: Ref<Tracks> };

// 初始化轨道数据格式
const initTracks = (count: number): Tracks => {
  const initTrack = [];
  for (let i = 0; i < count; i++) {
    initTrack.push([]);
  }
  return initTrack;
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

  watch(
    rows,
    (val) => {
      watchRowsChange(val as unknown as number, tracks.value);
    },
    {
      immediate: true,
    }
  );

  return { tracks };
};

export default useTracks;
