function has_contenteditable_attr(node2) {
    return node2.attributes.some(is_attr_contenteditable);
  }