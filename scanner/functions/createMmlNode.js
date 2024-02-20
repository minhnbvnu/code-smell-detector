function createMmlNode(t,frag) {
  var node;
  if (isIE) node = document.createElement("m:"+t);
  else node = document.createElementNS(AMmathml,t);
  if (frag) node.appendChild(frag);
  return node;
}