function not_whitespace_text(node2) {
    return !(node2.type === "Text" && regex_only_whitespaces.test(node2.data));
  }