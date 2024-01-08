import { useCallback, useEffect, useState } from 'react';

export const useLocalStorage = (
  localStorageKey: string,
  defaultValue: any
): [any, (value: any) => void, () => void] => {
  let jsonValue: any = null;
  try {
    jsonValue = JSON.parse(localStorage.getItem(localStorageKey) || 'null');
  } catch (error) {}

  const [value, setValue] = useState<any>(jsonValue ?? defaultValue);

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(value));
  }, [localStorageKey, value]);

  const clearValue = useCallback(() => {
    localStorage.removeItem(localStorageKey);
  }, [localStorageKey]);

  return [value, setValue, clearValue];
};
