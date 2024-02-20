function useMap() {
  const map = useRef(new Map());
  return {
    set: (key, value) => map.current.set(key, value),
    has: key => map.current.has(key),
    get: key => map.current.get(key),
  };
}