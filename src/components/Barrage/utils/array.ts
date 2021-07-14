// 获取数组第一个元素，如果没有返回undefined
export function head<T>(target: Array<T>): T | undefined {
  return target.shift();
}

// 获取数组最后一个元素，如果没有返回undefined
export function last<T>(target: Array<T>): T | undefined {
  if (!target.length) return undefined;
  return target[target.length - 1];
}

// 判断所有子数组是否都为空
export function isEveryEmpty(array: Array<any>): boolean {
  return array.every((item) => !item.length);
}
