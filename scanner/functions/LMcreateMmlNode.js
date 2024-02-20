function LMcreateMmlNode(t,frag) {
//  var node = LMcreateElementMathML(name);
  if (isIE) var node = document.createElement("m:"+t);
  else var node = document.createElementNS(LMmathml,t);
  node.appendChild(frag);
  return node;
}