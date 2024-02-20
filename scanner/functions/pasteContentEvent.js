function pasteContentEvent(node, text) {
  node.focus();
  const data = new DataTransfer();
  data.setData("text/plain", text);

  const event = new ClipboardEvent("paste", { clipboardData: data });
  document.dispatchEvent(event);
  data.clearData();
}