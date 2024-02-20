function generateTextShadow(width) {
  return  Platform.select({ web: {
    textShadow: `-${width}px 0px 0px #000, ${width}px 0px 0px #000, 0px -${width}px 0px #000, 0px ${width}px 0px #000`
  }, default: {} });
}