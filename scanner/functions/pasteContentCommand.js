function pasteContentCommand(node, text) {
  node.focus();
  document.execCommand("insertText", false, text);
}