function circleRectCollision(object, pointer) {
  let { x, y, width, height } = getWorldRect(object);

  // account for camera
  do {
    x -= object.sx || 0;
    y -= object.sy || 0;
  } while ((object = object.parent));

  let dx = pointer.x - Math.max(x, Math.min(pointer.x, x + width));
  let dy = pointer.y - Math.max(y, Math.min(pointer.y, y + height));
  return dx * dx + dy * dy < pointer.radius * pointer.radius;
}