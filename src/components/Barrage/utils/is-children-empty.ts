export default function (array: Array<any>): boolean {
  for (let i = 0; i < array.length; i++) {
    if (Array.isArray(array[i]) && array[i].length) return false;
  }
  return true;
}
