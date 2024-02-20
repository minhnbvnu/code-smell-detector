function measureLayout(component) {
  let i = 0;
  return new Promise((resolve, reject) => {
    function onMeasure(x, y, width, height, pageX, pageY) {
      if (width || height) {
        return resolve({
          x: pageX,
          y: pageY,
          width,
          height,
          scaleX: 1,
          scaleY: 1
        });
      }
      i++;
      if (x === undefined || i >= 3)
        return reject(
          new Error(`[MagicMove] Failed to measure ${component.debugName}`)
        );
      requestAnimationFrame(() => {
        component.ref.measure(onMeasure);
      });
    }
    // console.debug(`[MagicMove] Measuring ${component.debugName} ...`);
    component.ref.measure(onMeasure);
  });
}