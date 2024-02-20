function toArrayChildren(children) {
  var ret = [];
  external_window_React_default.a.Children.forEach(children, function (child) {
    ret.push(child);
  });
  return ret;
}