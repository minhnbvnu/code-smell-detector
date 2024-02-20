function pointerOver(object) {
  let canvas = object.context ? object.context.canvas : getCanvas();
  let pointer = pointers.get(canvas);

  // @ifdef DEBUG
  if (!pointer) {
    throw new ReferenceError(
      'Pointer events not initialized for the objects canvas'
    );
  }
  // @endif

  return (
    pointer._o.includes(object) &&
    /* eslint-disable-next-line no-restricted-syntax */
    getCurrentObject(pointer) === object
  );
}