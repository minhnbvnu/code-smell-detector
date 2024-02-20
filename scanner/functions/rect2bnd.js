function rect2bnd(rect) {
  var $document = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(document);
  return {
    top: rect.top + $document.scrollTop(),
    left: rect.left + $document.scrollLeft(),
    width: rect.right - rect.left,
    height: rect.bottom - rect.top
  };
}