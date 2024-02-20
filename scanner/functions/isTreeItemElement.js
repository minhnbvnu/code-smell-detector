function isTreeItemElement(el) {
  return isHTMLElement(el) && el.getAttribute("role") === "treeitem";
}