function getTextStyleClass(style, classes, name) {
  var key = getStyleKey(style);
  var cname = nameSpace + (name || 'style');
  var o, i;
  for (i=0; i<classes.length; i++) {
    o = classes[i];
    if (o.key == key) {
      return o.classname;
    }
  }
  o = {
    key: key,
    style: style,
    classname: cname + i
  };
  classes.push(o);
  return o.classname;
}