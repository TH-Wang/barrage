<template>
  <div class="text-view" ref="containerRef">
    <div
      class="track"
      :style="{ height: trackViewHeight + 'px' }"
      v-for="(track, idx) in tracks"
      :key="idx"
    >
      <div
        v-for="bullet in track"
        :key="bullet.data.id"
        class="text"
        v-load="{ listener: elementLoad, payload: bullet }"
      >
        {{ bullet.data.value }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted, PropType, toRefs } from "vue";
import useSizes from "./setup/useSizes";
import useTracks from "./setup/useTracks";
import animate from "./core/animate";
import sheduler, { pushQueue } from "./core/sheduler";
import { getBulltes } from "./model/index";
import {
  Text,
  Bullet,
  FontSizePropType,
  AreaPropType,
  AREA_ENUM,
  TrackHandlers,
} from "./types";

export default defineComponent({
  props: {
    // 字体大小
    fontSize: {
      type: [String, Number] as PropType<FontSizePropType>,
      default: 28,
    },
    area: {
      type: String as PropType<AreaPropType>,
      default: AREA_ENUM.SMALL,
    },
  },
  computed: {
    trackHeight(): number | string {
      const { fontSize } = this.$props;
      if (typeof fontSize === "number") return fontSize + "px";
      else return fontSize;
    },
  },
  directives: {
    load: {
      mounted(e, { value }) {
        nextTick(value.listener(e, value.payload));
      },
    },
  },
  setup(props) {
    const { fontSize, area } = toRefs(props);

    const { containerSize, containerRef, rows, trackViewHeight, getSizes } =
      useSizes(fontSize, area);

    const { tracks, initTrackHandlers } = useTracks(rows);

    const elementLoad = (el: Element, bullet: Bullet) => {
      animate(el, bullet);
    };

    const add = (text: Text | Text[]) => {
      if (Array.isArray(text)) {
        pushQueue(text.map((item) => ({ data: item, animate: null })));
      } else pushQueue({ data: text, animate: null });
    };

    const { pushTracks, cleanupTracks }: TrackHandlers = initTrackHandlers();
    sheduler({ pushTracks, cleanupTracks });

    onMounted(() => {
      getSizes();
      add(getBulltes());
    });

    return {
      // refs
      containerSize,
      containerRef,
      tracks,

      // computed
      trackViewHeight,

      // methods
      elementLoad,

      // exposed apis
      add,
    };
  },
});
</script>

<style lang="scss" scoped>
.text-view {
  width: 100%;
  // overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;

  .track {
    width: 100%;
  }

  .text {
    color: white;
    white-space: nowrap;
    vertical-align: top;
    display: inline-block;
    position: absolute;
    left: 100%;
    font-size: 28px;
    font-family: SimHei, "Microsoft JhengHei", Arial, Helvetica, sans-serif;
    text-shadow: rgb(0 0 0) 1px 0px 1px, rgb(0 0 0) 0px 1px 1px,
      rgb(0 0 0) 0px -1px 1px, rgb(0 0 0) -1px 0px 1px;
  }
}
</style>
