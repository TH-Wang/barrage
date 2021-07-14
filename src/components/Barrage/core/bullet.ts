import { cleanupBulletInTracks } from "../setup/useTracks";

class Bullet {
  public id: number | string;
  public value: number | string;
  public data?: any;
  public el?: Element;
  public animation?: Animation;

  constructor(id: number | string, value: number | string, data?: any) {
    this.id = id;
    this.value = value;
    this.data = data;
  }

  setEl(el: Element) {
    this.el = el;
  }

  setAnimation(instance: Animation) {
    this.animation = instance;
    // 监听动画完成事件，在轨道中清理该弹幕实例
    instance.onfinish = () => {
      cleanupBulletInTracks(this.id);
    };
  }

  // appeard
  get appeard(): boolean {
    if (!this.animation) return false;
    if (this.animation.currentTime === null) return false;
    return this.animation.currentTime > 20;
  }
}

export default Bullet;
