export default function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null;

  return function debouncedFunction(...args: Parameters<T>): void {
      if (timeoutId) {
          clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
         //@ts-ignore
          func.apply(this,args);
          timeoutId = null;
      }, wait);
  };
}
