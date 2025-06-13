import { useCallback } from 'react';

export function useReorderList(listSetter) {
  const moveItemUp = useCallback((index) => {
    listSetter((prev) => {
      if (index <= 0) return prev;
      const newList = [...prev];
      [newList[index - 1], newList[index]] = [newList[index], newList[index - 1]];
      return newList;
    });
  }, [listSetter]);

  const moveItemDown = useCallback((index) => {
    listSetter((prev) => {
      if (index >= prev.length - 1) return prev;
      const newList = [...prev];
      [newList[index + 1], newList[index]] = [newList[index], newList[index + 1]];
      return newList;
    });
  }, [listSetter]);

  return { moveItemUp, moveItemDown };
}
