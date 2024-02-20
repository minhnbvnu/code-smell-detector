function get_element_parent(node2) {
    let parent = node2;
    while ((parent = parent.parent) && parent.type !== "Element")
      ;
    return parent;
  }