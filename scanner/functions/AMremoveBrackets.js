function AMremoveBrackets(node) {
  var st;
  if (!node.hasChildNodes()) { return; }
  if (node.firstChild.hasChildNodes() && (node.nodeName=="mrow" || node.nodeName=="M:MROW")) {
    st = node.firstChild.firstChild.nodeValue;
    if (st=="(" || st=="[" || st=="{") node.removeChild(node.firstChild);
  }
  if (node.lastChild.hasChildNodes() && (node.nodeName=="mrow" || node.nodeName=="M:MROW")) {
    st = node.lastChild.firstChild.nodeValue;
    if (st==")" || st=="]" || st=="}") node.removeChild(node.lastChild);
  }
}