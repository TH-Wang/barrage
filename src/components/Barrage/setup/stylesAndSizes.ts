import { computed, Ref, ref, watch } from "vue";
import { FontSizePropType, AreaPropType, Size, AREA } from "../types";

type StylesAndSizes = (
  fontSize: Ref<FontSizePropType>,
  area: Ref<AreaPropType>,
  containerSize: Size
) => { rows: Ref<number>; trackViewHeight: string };

type WatchArea = (arg0: [AreaPropType, Size]) => void;

const stylesAndSizes: StylesAndSizes = (fontSize, area, containerSize) => {
  const rows = ref<number>(0);

  const trackViewHeight = computed((): number => {
    if (typeof fontSize.value === "number") return fontSize.value;
    else if (typeof fontSize.value === "string")
      return parseInt(fontSize.value.slice(0, -2));
    return 0;
  });

  const watchArea: WatchArea = ([areaVal, containerSize]) => {
    const { height } = containerSize;
    const total: number = Math.floor(height / trackViewHeight.value);

    switch (areaVal) {
      case AREA.SMALL:
        rows.value = Math.round(total / 4);
        break;
      case AREA.HALF:
        rows.value = Math.round(total / 2);
        break;
      case AREA.MOST:
        rows.value = Math.round((total / 4) * 3);
        break;
      case AREA.FULL:
        rows.value = total;
    }
  };

  watch([area, containerSize], watchArea, { immediate: true });

  return { rows, trackViewHeight: trackViewHeight.value + "px" };
};

export default stylesAndSizes;
