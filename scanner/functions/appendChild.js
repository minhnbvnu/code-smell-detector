function appendChild(elem, child) {
  removeElement(child);
  child.next = null;
  child.parent = elem;
  if (elem.children.push(child) > 1) {
    var sibling = elem.children[elem.children.length - 2];
    sibling.next = child;
    child.prev = sibling;
  } else {
    child.prev = null;
  }
}