function useUnmountedRef() {
  const unmountedRef = Object(react["useRef"])(false);
  Object(react["useEffect"])(() => {
    return () => {
      unmountedRef.current = true;
    };
  }, []);
  return unmountedRef;
}