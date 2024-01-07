function releaseCanvas(key) {
  const cacheItem = canvasCache[key];
  if (!cacheItem) {
    return;
  }

  cacheItem.users -= 1;
  if (cacheItem.users > 0) {
    return;
  }

  const gl = cacheItem.context;
  const extension = gl.getExtension('WEBGL_lose_context');
  if (extension) {
    extension.loseContext();
  }
  const canvas = gl.canvas;
  canvas.width = 1;
  canvas.height = 1;

  delete canvasCache[key];
}