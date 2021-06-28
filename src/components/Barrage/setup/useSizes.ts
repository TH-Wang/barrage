import { ref, Ref, reactive, computed, watch, ComputedRef } from "vue";
import { AreaPropType, FontSizePropType, Size, AREA } from "../types";

type UseSizes = (
  fontSize: Ref<FontSizePropType>,
  area: Ref<AreaPropType>
) => {
  containerRef: Ref<Element>;
  containerSize: Size;
  rows: Ref<number>;
  trackViewHeight: ComputedRef<number>;
  getSizes: () => void;
};

type ComputeRows = (
  area: AreaPropType,
  containerSize: Size,
  trackHeight: number
) => number;

// 计算轨道数量
const computeRows: ComputeRows = (area, containerSize, trackHeight) => {
  const { height } = containerSize;
  const total: number = Math.floor(height / trackHeight);

  switch (area) {
    case AREA.SMALL:
      return Math.round(total / 4);
    case AREA.HALF:
      return Math.round(total / 2);
    case AREA.MOST:
      return Math.round((total / 4) * 3);
    case AREA.FULL:
      return total;
    default:
      return 0;
  }
};

const useSizes: UseSizes = (fontSize, area) => {
  const containerRef = ref();
  const containerSize = reactive<Size>({ width: 0, height: 0 });

  const rows = ref<number>(0);

  // 轨道显示高度
  const trackViewHeight = computed((): number => {
    if (typeof fontSize.value === "number") return fontSize.value;
    else if (typeof fontSize.value === "string")
      return parseInt(fontSize.value.slice(0, -2));
    return 0;
  });

  // 获取所需尺寸
  const getSizes = () => {
    // 父容器尺寸
    containerSize.width = containerRef.value.getBoundingClientRect().width;
    containerSize.height =
      containerRef.value.parentNode.getBoundingClientRect().height;

    // 轨道数量
    rows.value = computeRows(area.value, containerSize, trackViewHeight.value);
  };

  watch(
    [area, containerSize],
    ([areaValue, containerSizeValue]) => {
      rows.value = computeRows(
        areaValue,
        containerSizeValue,
        trackViewHeight.value
      );
    },
    { immediate: true }
  );

  return { containerRef, containerSize, rows, trackViewHeight, getSizes };
};

export default useSizes;
