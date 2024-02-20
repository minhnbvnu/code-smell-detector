function windowClick(target) {
  let e = new Event('click');
  Object.defineProperty(e, 'target', {
    writable: false,
    value: target,
  });
  window.dispatchEvent(e);
}