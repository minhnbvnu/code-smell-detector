function getStaticStyles (oldVnode, vnode) {

  var style, name;
  var vm$$data = vnode && vnode.context ? vnode.context.$data : null;
  var styleSheet = vm$$data ? vm$$data.style : null;
  var preStyles = {};

  if(!vnode) 
    { return preStyles }

  // extend static class styles
  if (styleSheet && vnode.data && vnode.data.staticClass) {
    var classNames = vnode.data.staticClass.split(' ');
    classNames.forEach(function (cls) {
      if (cls === '') { return }

      if (styleSheet[cls]) {
        style = extend(style || {}, styleSheet[cls]);
      }
    });
  }

  // extend static style styles
  if (vnode.data && vnode.data.staticStyle) {
    var cssMap = styleValueToCssMap(vnode.data.staticStyle);
    style = extend(style || {}, cssMap);
  }

  if(!style)
    { return preStyles }
  
  for (name in style) {
    var norName = normalize(name);
    if (norName) {
      preStyles[norName] = style[name];
    }
  }

  // clone the style for future updates,
  // in case the user mutates the style object in-place.
  if (style) {
    vnode.data.baseStyle = extend({}, style);
  }

  return preStyles;
}