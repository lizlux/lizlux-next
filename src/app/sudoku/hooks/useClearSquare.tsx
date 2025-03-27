import { useEffect } from "react";

export function useClearSquare<T>(
  value: T | null,
  setValue: (val: T | null) => void,
  delay = 500
) {
  useEffect(() => {
    if (!value) {
      return;
    }
    const timer = setTimeout(() => {
      setValue(null);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, setValue, delay]);
}
