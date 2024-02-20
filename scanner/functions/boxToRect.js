function boxToRect(box) {
  const [top, right, bottom, left] = box;
  return {
    origin: {
      x: left,
      y: top
    },
    size: {
      width: right - left,
      height: bottom - top
    }
  };
}