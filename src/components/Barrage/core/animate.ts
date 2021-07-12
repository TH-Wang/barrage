import { Bullet } from "../types";

type InitParams = (
  el: Element,
  outerWidth: number
) => { s: number; t: number; appeardTime: number };

type InvokeAnimate = (el: Element, s: number, t: number) => Animation;

type Animate = (el: Element, bullet: Bullet, outerWidth: number) => void;

// 速度(100px/s)
const SPEED = 100;

const initParams: InitParams = (el, outerWidth) => {
  // 获取文本宽度
  const selfWidth: number = el.getBoundingClientRect().width;
  // 计算滚动距离
  const s: number = selfWidth + outerWidth + 10;
  // 计算全部出现的滑动距离所占比例
  const appeardPercentage: number = selfWidth / s;
  // 计算滚动的总时间
  const t: number = Math.round((s / SPEED) * 1000);
  // 计算全部出现所需时间
  const appeardTime: number = t * appeardPercentage;

  console.log(`自身长度：${selfWidth}, 容器宽度：${outerWidth}, 总路程：${s}`);
  return { s, t, appeardTime };
};

// 执行动画
const invokeAnimate: InvokeAnimate = (el, s, t) => {
  // 定义动画帧
  const keyframes = [
    { transform: "translateX(0px)" },
    { transform: `translateX(-${s}px)` },
  ];
  // 动画选项
  const options: KeyframeAnimationOptions = {
    duration: t,
    easing: "linear",
    fill: "forwards",
  };
  // 添加动画
  return el.animate(keyframes, options);
};

const animate: Animate = (el, bullet, outerWidth) => {
  const { s, t, appeardTime } = initParams(el, outerWidth);
  // 执行动画，获取动画信息对象
  const animation: Animation = invokeAnimate(el, s, t);
  // 挂载属性
  bullet.animate = animation;
  Object.defineProperty(bullet.animate, "appeard", {
    get: () => (animation.currentTime as number) >= appeardTime,
  });
};

export default animate;
