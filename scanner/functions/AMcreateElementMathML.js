function AMcreateElementMathML(t) {
  if (isIE) return document.createElement("m:"+t);
  else return document.createElementNS(AMmathml,t);
}