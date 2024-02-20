function useReferencedCallback() {
  const callbacks = useMap();
  return (key, current) => {
    if (!callbacks.has(key)) {
      const callback = (...args) => callback.current(...args);
      callbacks.set(key, callback);
    }
    callbacks.get(key).current = current;
    return callbacks.get(key);
  };
}