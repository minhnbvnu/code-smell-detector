function renderStringNode (el, context) {
  var write = context.write;
  var next = context.next;
  if (isUndef(el.children) || el.children.length === 0) {
    write(el.open + (el.close || ''), next);
  } else {
    var children = el.children;
    context.renderStates.push({
      type: 'Element',
      rendered: 0,
      total: children.length,
      endTag: el.close, children: children
    });
    write(el.open, next);
  }
}