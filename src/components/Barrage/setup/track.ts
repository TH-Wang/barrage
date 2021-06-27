import { onBeforeMount, Ref, ref, ToRefs, toRefs, watch } from "vue";
import { Text, Tracks } from "../barrage";
import sheduler, { pushQueue } from "../sheduler";

interface TrackSetup {
  tracks: Ref<Tracks>;
  add: (text: Text) => void;
}

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

export default function tracks(props: ToRefs): TrackSetup {
  const { rows } = toRefs(props);

  const initTrack: Tracks = initTracks(rows.value);
  const tracks = ref<Tracks>(initTrack);

  onBeforeMount(() => {
    sheduler(tracks.value, rows.value);
  });

  watch(
    rows,
    (val) => {
      watchRowsChange(val as unknown as number, tracks.value);
    },
    {
      immediate: true,
    }
  );

  const add = (text: Text) => {
    // 将 bullet 推入到缓冲队列
    pushQueue({ data: text, animate: null });
  };

  return { tracks, add };
}
