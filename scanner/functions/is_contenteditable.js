function is_contenteditable(node2) {
    return !is_input_or_textarea(node2) && has_contenteditable_attr(node2);
  }