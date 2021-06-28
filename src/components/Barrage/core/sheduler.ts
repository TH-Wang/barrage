import { Bullet, TrackHandlers, RENDER_STATUS_ENUM } from "../types";
import { getRenderStatus } from "../setup/useSizes";

// 等待队列（用于处理数据已经到达，但页面未完成渲染的情况）
const waitQueue: Array<Bullet> = [];

// 缓冲队列
const queue: Array<Bullet> = [];

// 执行器
type Executor = (() => void) | null;
let executor: Executor = null;

const push = (target: Array<Bullet>, bullets: Bullet | Bullet[]) => {
  if (Array.isArray(bullets)) target.push(...bullets);
  else target.push(bullets);
};

// 推送到缓冲队列
export const pushQueue = (bullet: Bullet | Bullet[]): void => {
  // 如果还没有渲染完成，就先存放到等待队列中
  if (getRenderStatus() !== RENDER_STATUS_ENUM.DONE) {
    push(waitQueue, bullet);
    return;
  }

  // 如果等待队列中有数据，则全部推送到缓冲队列中
  if (waitQueue.length) {
    push(queue, waitQueue);
    // 清空等待队列
    waitQueue.length = 0;
  }

  // 推送弹幕，一个或多个
  push(queue, bullet);

  // 执行器
  if (executor) executor();
};

export const getQueue = () => queue;

export default function sheduler({ pushTracks, cleanupTracks }: TrackHandlers) {
  // timeout return a number
  let worker: number | undefined = undefined;

  executor = () => {
    if (worker) return;

    worker = setTimeout(() => {
      pushTracks();
      cleanupTracks();

      if (!queue.length) {
        clearTimeout(worker);
        worker = undefined;
      } else {
        worker = undefined;
        if (executor) executor();
      }
    }, 200);
  };

  return executor;
}
