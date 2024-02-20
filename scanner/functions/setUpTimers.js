function setUpTimers() {
  const defineLazyTimer = (name) => {
    polyfillLazyGlobal(name, () => require('JSTimers')[name]);
  };
  defineLazyTimer('setTimeout');
  defineLazyTimer('setInterval');
  defineLazyTimer('setImmediate');
  defineLazyTimer('clearTimeout');
  defineLazyTimer('clearInterval');
  defineLazyTimer('clearImmediate');
  defineLazyTimer('requestAnimationFrame');
  defineLazyTimer('cancelAnimationFrame');
}