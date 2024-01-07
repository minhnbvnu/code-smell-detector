function getMinZoom() {
  const width = viewport.clientWidth;
  return Math.ceil(Math.LOG2E * Math.log(width / 256));
}