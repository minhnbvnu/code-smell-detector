function LMparseMath(str) {
  var result, node = LMcreateElementMathML("mstyle");
  if (mathcolor != "") node.setAttribute("mathcolor",mathcolor);
  if (mathfontfamily != "") node.setAttribute("fontfamily",mathfontfamily);
  node.appendChild(LMparseExpr(str.replace(/^\s+/g,""),false,false)[0]);
  node = LMcreateMmlNode("math",node);
  if (showasciiformulaonhover)                      //fixed by djhsu so newline
    node.setAttribute("title",str.replace(/\s+/g," "));//does not show in Gecko
  if (mathfontfamily != "" && (isIE || mathfontfamily != "serif")) {
    var fnode = LMcreateElementXHTML("font");
    fnode.setAttribute("face",mathfontfamily);
    fnode.appendChild(node);
    return fnode;
  }
  return node;
}