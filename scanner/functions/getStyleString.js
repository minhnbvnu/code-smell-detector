function getStyleString (vnode) {

  var preStyles = getStaticStyles(null, vnode);
  preStyles = extend(preStyles, getUpdateStyles(null, vnode));
  if(vnode.data && vnode.data.parentStaticStyle)
    { preStyles = extend(preStyles, vnode.data.parentStaticStyle); }
  if (Object.keys(preStyles) && Object.keys(preStyles).length > 0) {
    var preStylesString = '';
    // camelized css node
    for (var name in preStyles) {
      var norName = hyphenate(name);
      var value = (void 0);
      if (ruleStyles(name)) {
        value = transforCssNum2RulerNum(preStyles[name]);
      } else {
        value = preStyles[name];
      }
      if (value) {
        // value 有可能为'' 或者为undefined魔
        preStylesString += norName + ': ' + value + ';';
      }
    }
    return (" style=" + (JSON.stringify(preStylesString)))
  } else {
    return ''
  }
}