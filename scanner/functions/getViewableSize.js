function getViewableSize(defaultWidth = 0, defaultHeight = 0) {
  const sizes = {
    width: defaultWidth,
    height: defaultHeight,
  };

  if (window || document) {
    sizes.width =
      document.body.clientWidth ||
      document.documentElement.clientWidth ||
      window.innerWidth ||
      0;
    sizes.height =
      document.body.clientHeight ||
      document.documentElement.clientHeight ||
      window.innerHeight ||
      0;
  }

  return sizes;
}