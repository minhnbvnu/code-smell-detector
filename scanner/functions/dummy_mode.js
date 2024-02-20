function dummy_mode(overrides = {}) {
  return {
    $container: document.createElement('div'),
    $visibleWorld: document.createElement('div'),
    scale: 1,
    htmlDimensionsCacher: {
      clientWidth: 100,
      clientHeight: 100,
      boundingClientRect: { left: 0, top: 0 },
    },
    scaleCenter: {x: 0.5, y: 0.5},
    ...overrides
  };
}