function dom_value($node, stripLinebreaks) {
  var val = isTextarea($node[0]) ? $node.val() : $node.html();

  if (stripLinebreaks) {
    return val.replace(/[\n\r]/g, '');
  }

  return val;
}