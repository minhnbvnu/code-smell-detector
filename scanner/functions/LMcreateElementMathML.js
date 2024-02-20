function LMcreateElementMathML(t) {
  if (isIE) return document.createElement("m:"+t);
  else return document.createElementNS(LMmathml,t);
}