function getCurrentObject(pointer) {
  // if pointer events are required on the very first frame or
  // without a game loop, use the current frame
  let renderedObjects = pointer._lf.length
    ? pointer._lf
    : pointer._cf;

  for (let i = renderedObjects.length - 1; i >= 0; i--) {
    let object = renderedObjects[i];
    let collides = object.collidesWithPointer
      ? object.collidesWithPointer(pointer)
      : circleRectCollision(object, pointer);

    if (collides) {
      return object;
    }
  }
}