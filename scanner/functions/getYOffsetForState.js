function getYOffsetForState({
  steps,
  rootViewport,
  elHeights,
  activeStepIndex
}) {
  if (!isLayoutReady({ steps, rootViewport, elHeights })) {
    return 0;
  }

  const isPortraitScreen = rootViewport.height > rootViewport.width;
  const baseOffset = isPortraitScreen ? 0 : Math.round(rootViewport.height / 2);
  const visibleElements = getVisibleElements({ elHeights, activeStepIndex });

  // In portrait mode, elements are aligned to bottom
  // In landscape mode, elements are aligned to center
  return (
    -baseOffset -
    visibleElements.reduce((total, nextHeight, index) => {
      const isLast = index === activeStepIndex;
      const toAdd =
        !isPortraitScreen && isLast ? Math.round(nextHeight / 2) : nextHeight;

      return total + toAdd;
    }, 0)
  );
}