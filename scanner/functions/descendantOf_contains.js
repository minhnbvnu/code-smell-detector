function descendantOf_contains(element, ancestor) {
    element = $(element), ancestor = $(ancestor);
    if (!ancestor.contains) return descendantOf_DOM(element, ancestor);
    return ancestor.contains(element) && ancestor !== element;
  }