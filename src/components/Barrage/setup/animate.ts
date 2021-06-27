import { Ref } from "vue";
import { Bullet } from "../types";

type InvokeAnimate = (e: Element, moveX: number, duration: number) => Animation;

// 速度(100px/s)
const SPEED = 100;

// 执行动画
const invokeAnimate: InvokeAnimate = (e, moveX, duration) => {
  // 定义动画帧
  const keyframes = [
    { transform: "translateX(0px)" },
    { transform: `translateX(-${moveX}px)` },
  ];
  // 动画选项
  const options: KeyframeAnimationOptions = {
    duration,
    easing: "linear",
    fill: "forwards",
  };
  // 添加动画
  return e.animate(keyframes, options);
};

type TextElementLoad = (e: Element, bullet: Bullet) => void;
interface AnimateReturn {
  textElementLoad: TextElementLoad;
}

export default function animate(containerSize: Ref<number>): AnimateReturn {
  const textElementLoad: TextElementLoad = (e, bullet) => {
    // 获取文本宽度
    const selfSize: number = e.getBoundingClientRect().width;
    // 计算滚动距离
    const moveX: number = selfSize + containerSize.value + 10;
    // 计算全部出现的滑动距离所占比例
    const appeardPercentage: number = selfSize / moveX;
    // 计算滚动的总时间
    const duration: number = Math.round((moveX / SPEED) * 1000);
    // 计算全部出现所需时间
    const appeardTime: number = duration * appeardPercentage;
    // 执行动画，获取动画信息对象
    const animation: Animation = invokeAnimate(e, moveX, duration);
    // 挂载属性
    // (animation as AnimationWithCustomParams).appeardTime = appeardTime;
    bullet.animate = animation;
    Object.defineProperty(bullet.animate, "appeard", {
      get() {
        return (animation.currentTime as number) >= appeardTime;
      },
    });
  };

  return { textElementLoad };
}
