function listAncestor(node, pred) {
  pred = pred || func.fail;
  var ancestors = [];
  dom_ancestor(node, function (el) {
    if (!isEditable(el)) {
      ancestors.push(el);
    }

    return pred(el);
  });
  return ancestors;
}