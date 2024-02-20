function isEmptyNode(node2) {
    return node2.type === "Text" && node2.data.trim() === "";
  }