function setStaticStyles (oldVnode, vnode) {
  var elm = vnode.elm;

  var style, name;
  var vm$$data = vnode.context.$data;
  var styleSheet = vm$$data.style;

  // extend static class styles
  if (vnode.data.staticClass) {
    var classNames = vnode.data.staticClass.split(' ');
    classNames.forEach(function (cls) {
      if (cls === '') { return }

      if (styleSheet[cls]) {
        style = extend(style || {}, styleSheet[cls]);
      }
    });
  }

  // extend static style styles
  if (!isEmptyObject(vnode.data.staticStyle)) {
    style = extend(style || {}, vnode.data.staticStyle);
  }

  var preStyles = {};
  for (name in style) {
    var norName = normalize(name);
    if (norName) {
      preStyles[norName] = style[name];
    }
  }
  setStyles(elm, preStyles);

  // clone the style for future updates,
  // in case the user mutates the style object in-place.
  if (style) {
    vnode.data.baseStyle = extend({}, style);
  }
}