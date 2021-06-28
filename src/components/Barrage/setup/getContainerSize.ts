import { ref, onMounted, Ref, reactive } from "vue";
import { Size } from "../types";

interface GetContainerSize {
  containerRef: Ref<Element>;
  containerSize: Size;
}

export default function getContainerSize(): GetContainerSize {
  const containerRef = ref();
  const containerSize = reactive<Size>({ width: 0, height: 0 });

  const getSize = () => {
    containerSize.width = containerRef.value.getBoundingClientRect().width;
    containerSize.height =
      containerRef.value.parentNode.getBoundingClientRect().height;
  };

  onMounted(getSize);

  return { containerRef, containerSize };
}
