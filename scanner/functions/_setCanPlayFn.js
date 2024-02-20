function _setCanPlayFn(fn) {
  let originalCanPlay = getCanPlay;
  /* eslint-disable-next-line no-func-assign */
  getCanPlay = fn;
  getCanPlay._r = originalCanPlay;
}