import { ref, Ref, reactive, computed, watch, ComputedRef } from "vue";
import {
  AreaPropType,
  FontSizePropType,
  Size,
  AREA_ENUM,
  RENDER_STATUS_ENUM,
  RenderStatus,
} from "../types";

type UseSizes = (
  fontSize: Ref<FontSizePropType>,
  area: Ref<AreaPropType>
) => {
  outerRef: Ref<Element>;
  outerSize: Size;
  rows: Ref<number>;
  trackStyles: ComputedRef<number>;
  initOuterSize: () => void;
};

type ComputeRows = (
  area: AreaPropType,
  outerSize: Size,
  trackHeight: number
) => number;

let render_status: RenderStatus = RENDER_STATUS_ENUM.PENDING;

export function getRenderStatus(): RenderStatus {
  return render_status;
}

// 计算轨道数量
const computeRows: ComputeRows = (area, outerSize, trackHeight) => {
  const { height } = outerSize;
  const total: number = Math.floor(height / trackHeight);

  const areaToRows = {
    [AREA_ENUM.SMALL]: Math.round(total / 4),
    [AREA_ENUM.HALF]: Math.round(total / 2),
    [AREA_ENUM.MOST]: Math.round((total / 4) * 3),
    [AREA_ENUM.FULL]: total,
  };

  return areaToRows[area] || 0;
};

const useSizes: UseSizes = (fontSize, area) => {
  const outerRef = ref();
  const outerSize = reactive<Size>({ width: 0, height: 0 });

  const rows = ref<number>(0);

  // 轨道显示高度
  const trackStyles = computed((): number => {
    if (typeof fontSize.value === "number") return fontSize.value + 4;
    else if (typeof fontSize.value === "string")
      return parseInt(fontSize.value.slice(0, -2)) + 4;
    return 0;
  });

  // 获取所需尺寸
  const initOuterSize = () => {
    // 父容器尺寸
    outerSize.width = outerRef.value.getBoundingClientRect().width;
    outerSize.height = outerRef.value.parentNode.getBoundingClientRect().height;

    // 轨道数量
    rows.value = computeRows(area.value, outerSize, trackStyles.value);

    // 改变渲染状态 -> done
    render_status = RENDER_STATUS_ENUM.DONE;
  };

  watch(
    [area, outerSize],
    ([areaValue, containerSizeValue]) => {
      rows.value = computeRows(
        areaValue,
        containerSizeValue,
        trackStyles.value
      );
    },
    { immediate: true }
  );

  return { outerRef, outerSize, rows, trackStyles, initOuterSize };
};

export default useSizes;
