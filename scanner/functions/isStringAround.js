function isStringAround(node, start, end) {
    return node.type == "Literal" && typeof node.value == "string" && node.start == start - 1 && node.end <= end + 1;
  }