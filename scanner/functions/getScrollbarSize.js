function getScrollbarSize(recalculate) {
  if (recalculate === void 0) {
    recalculate = false;
  }

  if (index_esm_size === -1 || recalculate) {
    var div = document.createElement('div');
    var style = div.style;
    style.width = '50px';
    style.height = '50px';
    style.overflow = 'scroll';
    document.body.appendChild(div);
    index_esm_size = div.offsetWidth - div.clientWidth;
    document.body.removeChild(div);
  }

  return index_esm_size;
}