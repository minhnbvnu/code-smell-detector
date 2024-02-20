function LMparseIexpr(str) {
  var symbol, sym1, sym2, node, result, tag, underover;
  str = LMremoveCharsAndBlanks(str,0);
  sym1 = LMgetSymbol(str);
  result = LMparseSexpr(str);
  node = result[0];
  str = result[1];
  tag = result[2];
  symbol = LMgetSymbol(str);
  if (symbol.ttype == INFIX) {
    str = LMremoveCharsAndBlanks(str,symbol.input.length);
    result = LMparseSexpr(str);
    if (result[0] == null) // show box in place of missing argument
      result[0] = LMcreateMmlNode("mo",document.createTextNode("\u25A1"));
    str = result[1];
    tag = result[2];
    if (symbol.input == "_" || symbol.input == "^") {
      sym2 = LMgetSymbol(str);
      tag = null;	// no space between x^2 and a following sin, cos, etc.
// This is for \underbrace and \overbrace
      underover = ((sym1.ttype == UNDEROVER) || (node.ttype == UNDEROVER));
//    underover = (sym1.ttype == UNDEROVER);
      if (symbol.input == "_" && sym2.input == "^") {
        str = LMremoveCharsAndBlanks(str,sym2.input.length);
        var res2 = LMparseSexpr(str);
	str = res2[1];
	tag = res2[2];  // leave space between x_1^2 and a following sin etc.
        node = LMcreateMmlNode((underover?"munderover":"msubsup"),node);
        node.appendChild(result[0]);
        node.appendChild(res2[0]);
      } else if (symbol.input == "_") {
	node = LMcreateMmlNode((underover?"munder":"msub"),node);
        node.appendChild(result[0]);
      } else {
	node = LMcreateMmlNode((underover?"mover":"msup"),node);
        node.appendChild(result[0]);
      }
      node = LMcreateMmlNode("mrow",node); // so sum does not stretch
    } else {
      node = LMcreateMmlNode(symbol.tag,node);
      if (symbol.input == "\\atop" || symbol.input == "\\choose")
	node.setAttribute("linethickness","0ex");
      node.appendChild(result[0]);
      if (symbol.input == "\\choose")
	node = LMcreateMmlNode("mfenced",node);
    }
  }
  return [node,str,tag];
}