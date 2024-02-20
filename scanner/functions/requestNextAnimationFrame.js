function requestNextAnimationFrame(callback) {
  return requestAnimationFrame(() => {
    requestAnimationFrame(callback);
  });
}