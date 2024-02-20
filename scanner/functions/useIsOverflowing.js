function useIsOverflowing(containerRef, totalChildWidth) {
  const [isOverflowing, setIsOverflowing] = Object(react["useState"])(false); // It's important to use a layout effect, so that we avoid showing a flash of overflowed content.

  Object(react["useLayoutEffect"])(() => {
    if (containerRef.current === null) {
      return () => {};
    }

    const container = containerRef.current;
    const handleResize = lodash_throttle_default()(() => setIsOverflowing(container.clientWidth <= totalChildWidth), 100);
    handleResize(); // It's important to listen to the ownerDocument.defaultView to support the browser extension.
    // Here we use portals to render individual tabs (e.g. Profiler),
    // and the root document might belong to a different window.

    const ownerWindow = container.ownerDocument.defaultView;
    ownerWindow.addEventListener('resize', handleResize);
    return () => ownerWindow.removeEventListener('resize', handleResize);
  }, [containerRef, totalChildWidth]);
  return isOverflowing;
}