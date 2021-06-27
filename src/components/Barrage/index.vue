<template>
  <div class="text-view" ref="containerRef">
    <div class="track" v-for="(track, idx) in tracks" :key="idx">
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
import { defineComponent, nextTick } from "vue";
import getContainerSize from "./setup/getContainerSize";
import track from "./setup/track";
import animate from "./setup/animate";

export default defineComponent({
  props: {
    rows: {
      type: Number,
      default: 2,
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
    const { containerSize, containerRef } = getContainerSize();
    const { textElementLoad } = animate(containerSize);
    const { tracks, add } = track(props);

    return {
      containerSize,
      containerRef,

      tracks,
      add,

      textElementLoad,
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
    height: 36px;
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
