import { useState, useEffect } from "react";

export function useLocalStorageState(initialState: any, key: any) {
  // lazy initial state => pass a callback function
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });
  // store the watched to local storage
  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return { value, setValue };
}
