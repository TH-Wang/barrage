<template>
  <div class="text-view" ref="containerRef">
    <div
      class="track"
      :style="{ height: trackViewHeight }"
      v-for="(track, idx) in tracks"
      :key="idx"
    >
      <div
        v-for="bullet in track"
        :key="bullet.data.id"
        class="text"
        v-load="{ listenr: textElementLoad, payload: bullet }"
      >
        {{ bullet.data.value }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, PropType, toRefs } from "vue";
import getContainerSize from "./setup/getContainerSize";
import stylesAndSizes from "./setup/stylesAndSizes";
import track from "./setup/track";
import animate from "./setup/animate";
import { FontSizePropType, AreaPropType, AREA } from "./types";

export default defineComponent({
  props: {
    // 字体大小
    fontSize: {
      type: [String, Number] as PropType<FontSizePropType>,
      default: 28,
    },
    area: {
      type: String as PropType<AreaPropType>,
      default: AREA.SMALL,
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
        nextTick(value.listenr(e, value.payload));
      },
    },
  },
  setup(props) {
    const { fontSize, area } = toRefs(props);

    const { containerSize, containerRef } = getContainerSize();
    const { rows, trackViewHeight } = stylesAndSizes(
      fontSize,
      area,
      containerSize
    );
    const { textElementLoad } = animate(containerSize);
    const { tracks, add } = track(rows);

    return {
      containerSize,
      containerRef,
      trackViewHeight,
      textElementLoad,
      tracks,
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
