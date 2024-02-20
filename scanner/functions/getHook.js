function getHook(...args) {
    return renderHook(() => useWindowSize(...args));
  }