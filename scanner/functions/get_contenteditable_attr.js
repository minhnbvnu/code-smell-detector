function get_contenteditable_attr(node2) {
    return node2.attributes.find(is_attr_contenteditable);
  }