function getOrCreateContext(key) {
  let cacheItem = canvasCache[key];
  if (!cacheItem) {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    canvas.style.position = 'absolute';
    canvas.style.left = '0';
    const context = getContext(canvas);
    cacheItem = {users: 0, context};
    canvasCache[key] = cacheItem;
  }

  cacheItem.users += 1;
  return cacheItem.context;
}