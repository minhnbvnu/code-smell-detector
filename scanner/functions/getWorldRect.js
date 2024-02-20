function getWorldRect(obj) {
  let { x = 0, y = 0, width, height } = obj.world || obj;

  // take into account tileEngine
  if (obj.mapwidth) {
    width = obj.mapwidth;
    height = obj.mapheight;
  }

  // @ifdef GAMEOBJECT_ANCHOR
  // account for anchor
  if (obj.anchor) {
    x -= width * obj.anchor.x;
    y -= height * obj.anchor.y;
  }
  // @endif

  // @ifdef GAMEOBJECT_SCALE
  // account for negative scales
  if (width < 0) {
    x += width;
    width *= -1;
  }
  if (height < 0) {
    y += height;
    height *= -1;
  }
  // @endif

  return {
    x,
    y,
    width,
    height
  };
}