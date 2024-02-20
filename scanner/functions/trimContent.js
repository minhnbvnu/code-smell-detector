function trimContent(child) {
  if (child.content) {
    child.content = child.content.trim();
  } else if (child.children) {
    child.children.forEach(trimContent);
  }
}