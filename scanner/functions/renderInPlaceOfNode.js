function renderInPlaceOfNode(reactElement, targetNode) {
  var container = targetNode.parentNode;
  var prevSibs = [];
  var nextSibs = [];
  var sibs = prevSibs;
  var child = container.firstChild;

  while (child) {
    if (child === targetNode) {
      sibs = nextSibs;
    } else {
      sibs.push(child);
    }
    var next = child.nextSibling;
    container.removeChild(child);
    child = next;
  }

  var result = React.render(reactElement, container);
  var rendered = container.firstChild;

  if (prevSibs.length > 0) {
    prevSibs.forEach(function(sib) {
      container.insertBefore(sib, rendered);
    });
  }

  if (nextSibs.length > 0) {
    nextSibs.forEach(function(sib) {
      container.appendChild(sib);
    });
  }

  return result;
}