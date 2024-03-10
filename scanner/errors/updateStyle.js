function updateStyle (oldVnode, vnode) {
  if (vnode.data.staticClass !== oldVnode.data.staticClass ||
    vnode.data.staticStyle !== oldVnode.data.staticStyle) {
    setStaticStyles(oldVnode, vnode);
  }

    /**
   * @baseStyle: static staticStyle & staticClass cache
   * @preStyles: current style & class collection
   * @bindClassStyle: -> :class
   * @bindStyle: -> :style
   */

  var elm = vnode.elm;
  var oldStyle = oldVnode.data.style;
  var baseStyle = oldVnode.data.baseStyle || vnode.data.baseStyle;

  // get default tag styles

  var preStyles = {};
  if (oldStyle) {
    for (var name in oldStyle) {
      // new style wait to del
      var norName = normalize(name);
      if (norName) {
        preStyles[norName] = baseStyle && baseStyle[name] || '';
      }
    }
  }

  // process v-bind:style v-bind:class
  var bindStyle = {};
  var attrs = vnode.data;
  var styleMap = vnode.context._data.style;
  var bindClassStyle = {};
  if (attrs) {
    // [style1,style2] style1:{color:'#ff3355'},style2:{fontSize:80}
    if (Array.isArray(attrs.style)) {
      for (var i = 0; i < attrs.style.length; i++) {
        bindStyle = extend(bindStyle, attrs.style[i]);
      }
    } else if (typeof attrs.style === 'object') {
      // {color:'#ff3355',fontSize:80}
      bindStyle = attrs.style;
    }
    // [class1,class2] .class1{height:200} .active{width:400}
    if (Array.isArray(attrs.class)) {
      for (var i$1 = 0; i$1 < attrs.class.length; i$1++) {
        var klass = attrs.class[i$1];
        bindClassStyle = extend(bindClassStyle, styleMap[klass]);
      }
    } else if (typeof attrs.class === 'object') {
      // {class1:true|false,class2:true|false}
      var truebindStyle = {};
      var falsebindStyle = {};
      for (var klass$1 in attrs.class) {
        if (attrs.class[klass$1]) {
          truebindStyle = extend(truebindStyle, styleMap[klass$1]);
        } else {
          // class[klass] is false
          var tmpFalsebindStyle = {};
          for (var styleKey in styleMap[klass$1]) {
            if (baseStyle && baseStyle[styleKey]) {
              tmpFalsebindStyle[styleKey] = baseStyle[styleKey];
            } else {
              tmpFalsebindStyle[styleKey] = '';
            }
          }
          falsebindStyle = extend(falsebindStyle, tmpFalsebindStyle);
        }
      }
      bindClassStyle = extend(bindClassStyle, falsebindStyle);
      bindClassStyle = extend(bindClassStyle, truebindStyle);
    }
  }

  // clone the style for future updates,
  // in case the user mutates the style object in-place.
  var curStyles = extend(bindClassStyle, bindStyle);
  var normalizedCurStyles = {};
  if (!isEmptyObject(curStyles)) {
    for (var key in curStyles) {
      normalizedCurStyles[normalize(key)] = curStyles[key];
    }
    vnode.data.style = normalizedCurStyles;
  }

  if (baseStyle) {
    vnode.data.baseStyle = extend({}, baseStyle);
  }

  preStyles = extend(preStyles, normalizedCurStyles);

  setStyles(elm, preStyles);

  if(elm && !elm.style && !isEmptyObject(preStyles)) {
    elm.setStyle('', '');
  }
}