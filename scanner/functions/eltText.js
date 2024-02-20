function eltText(node) {
    return node.textContent || node.innerText || node.nodeValue || "";
  }