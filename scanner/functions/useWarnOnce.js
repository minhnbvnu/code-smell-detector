function useWarnOnce() {
  const didWarnRef = useRef(new Set());
  return (key, message) => {
    if (!didWarnRef.current.has(key)) {
      didWarnRef.current.add(key);
      console.warn('[useFormState]', message);
    }
  };
}