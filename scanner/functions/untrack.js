function untrack(...objects) {
  objects.flat().map(object => {
    let canvas = object.context ? object.context.canvas : getCanvas();
    let pointer = pointers.get(canvas);

    // @ifdef DEBUG
    if (!pointer) {
      throw new ReferenceError(
        'Pointer events not initialized for the objects canvas'
      );
    }
    // @endif

    // restore original render function to no longer track render
    // order
    object.render = object._r;
    object._r = 0; // 0 is the shortest falsy value

    removeFromArray(pointer._o, object);
  });
}