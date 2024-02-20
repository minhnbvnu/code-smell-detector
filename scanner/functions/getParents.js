function getParents(el, selector, until = null) {
  const parents = [];
  let parent = el.parentElement;
  while (parent) {
    if (parent.matches(selector)) {
      parents.push(parent);
    } else if (until && (until === parent || parent.matches(until))) {
      break;
    }
    parent = parent.parentElement;
  }
  return parents;
}