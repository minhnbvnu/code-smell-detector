function createComposedLayout(...layouters) {
  if (layouters.length === 0) {
    return noopLayout;
  }

  const composedLayout = (layout, containerFrame) => {
    return layouters.reduce((intermediateLayout, layouter) => layouter(intermediateLayout, containerFrame), layout);
  };

  return composedLayout;
}