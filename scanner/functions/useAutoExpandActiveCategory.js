function useAutoExpandActiveCategory({ isActive, collapsed, updateCollapsed }) {
  const wasActive = usePrevious(isActive);

  useEffect(() => {
    const justBecameActive = isActive && !wasActive;
    if (justBecameActive && collapsed) {
      updateCollapsed(false);
    }
  }, [isActive, wasActive, collapsed, updateCollapsed]);
}