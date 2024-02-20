function compareDocumentPosition(nodeA, nodeB) {
  var aParents = [];
  var bParents = [];
  if (nodeA === nodeB) {
    return 0;
  }
  var current = (0, domhandler_1.hasChildren)(nodeA) ? nodeA : nodeA.parent;
  while (current) {
    aParents.unshift(current);
    current = current.parent;
  }
  current = (0, domhandler_1.hasChildren)(nodeB) ? nodeB : nodeB.parent;
  while (current) {
    bParents.unshift(current);
    current = current.parent;
  }
  var maxIdx = Math.min(aParents.length, bParents.length);
  var idx = 0;
  while (idx < maxIdx && aParents[idx] === bParents[idx]) {
    idx++;
  }
  if (idx === 0) {
    return 1 /* DISCONNECTED */;
  }

  var sharedParent = aParents[idx - 1];
  var siblings = sharedParent.children;
  var aSibling = aParents[idx];
  var bSibling = bParents[idx];
  if (siblings.indexOf(aSibling) > siblings.indexOf(bSibling)) {
    if (sharedParent === nodeB) {
      return 4 /* FOLLOWING */ | 16 /* CONTAINED_BY */;
    }

    return 4 /* FOLLOWING */;
  }

  if (sharedParent === nodeA) {
    return 2 /* PRECEDING */ | 8 /* CONTAINS */;
  }

  return 2 /* PRECEDING */;
}