import { ref, onMounted, Ref } from "vue";

interface GetContainerSize {
  containerRef: Ref<Element>;
  containerSize: Ref;
}

export default function getContainerSize(): GetContainerSize {
  const containerRef = ref();
  const containerSize = ref<number>();

  const getSize = () => {
    containerSize.value = containerRef.value.getBoundingClientRect().width;
  };

  onMounted(getSize);

  return { containerSize, containerRef };
}
