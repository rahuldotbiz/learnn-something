/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

const cache = new Map<string, { result: unknown; time: number }>();
export const memoize = <T extends (...args: unknown[]) => ReturnType<T>>(
  fn: T,
  timeout: number
) => {
  return function (...args: Parameters<T>) {
    // Cache based on the function name and the arguments
    const key = `${fn.name}-${JSON.stringify(args)}`;
    const cached = cache.get(key);
    if (cached && Date.now() - cached.time < timeout) {
      return cached.result;
    }
    const result = fn(...args);
    cache.set(key, { result, time: Date.now() });
    return result;
  } as T;
};

export const getColorFromString = (str: string) => {
  const hash = str.split("").reduce((acc, char) => {
    acc = char.charCodeAt(0) + ((acc << 5) - acc);
    return acc & acc;
  }, 0);
  const color = Math.floor(Math.abs(Math.sin(hash) * 16777215)).toString(16);

  // Return in rgba format
  return `rgba(${parseInt(color.slice(0, 2), 16)}, ${parseInt(
    color.slice(2, 4),
    16
  )}, ${parseInt(color.slice(4, 6), 16)}, 0.2)`;
};
