<template>
  <div class="text-view" ref="outerRef">
    <div
      class="track"
      :style="{ height: trackStyles + 'px' }"
      v-for="(track, idx) in tracks"
      :key="idx"
    >
      <div
        v-for="bullet in track"
        :key="bullet.data.id"
        class="text"
        v-load="{ onLoad: onBulletLoad, payload: bullet }"
      >
        {{ bullet.data.value }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, toRefs } from "vue";
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
        const { onLoad, payload } = value;
        onLoad(e, payload);
      },
    },
  },
  setup(props) {
    const { fontSize, area } = toRefs(props);

    const { outerSize, outerRef, rows, trackStyles, initOuterSize } = useSizes(
      fontSize,
      area
    );

    const { tracks, getTracks, pushTracks, cleanupTracks } = useTracks(rows);

    const onBulletLoad = (el: Element, bullet: Bullet) => {
      animate(el, bullet, outerSize.width);
    };

    const add = (text: Text | Text[]) => {
      if (Array.isArray(text)) {
        pushQueue(text.map((item) => ({ data: item, animate: null })));
      } else pushQueue({ data: text, animate: null });
    };

    sheduler({ getTracks, pushTracks, cleanupTracks });

    onMounted(() => {
      initOuterSize();
      add(getBulltes());
    });

    return {
      // refs
      outerSize,
      outerRef,
      tracks,

      // computed
      trackStyles,

      // methods
      onBulletLoad,

      // exposed apis
      add,
    };
  },
});
</script>

<style lang="scss" scoped>
.text-view {
  width: 100%;
  overflow: hidden;
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
