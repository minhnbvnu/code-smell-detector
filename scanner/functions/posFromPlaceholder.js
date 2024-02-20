function posFromPlaceholder(placeholder) {
  var $placeholder = external_root_jQuery_commonjs2_jquery_commonjs_jquery_amd_jquery_default()(placeholder);
  var pos = $placeholder.offset();
  var height = $placeholder.outerHeight(true); // include margin

  return {
    left: pos.left,
    top: pos.top + height
  };
}