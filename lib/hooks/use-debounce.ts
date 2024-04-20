import { useEffect } from 'react';
import { useDebounceValue } from 'usehooks-ts';

export default function useDebounce<T>(value: T, delay: number) {
  const [val, setVal] = useDebounceValue(value, delay);

  useEffect(() => {
    setVal(val);
  }, [val]);

  return val;
}
