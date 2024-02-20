function AMparseIexpr(str) {
  var symbol, sym1, sym2, node, result, underover;
  str = AMremoveCharsAndBlanks(str,0);
  sym1 = AMgetSymbol(str);
  result = AMparseSexpr(str);
  node = result[0];
  str = result[1];
  symbol = AMgetSymbol(str);
  if (symbol.ttype == INFIX && symbol.input != "/") {
    str = AMremoveCharsAndBlanks(str,symbol.input.length);
//    if (symbol.input == "/") result = AMparseIexpr(str); else ...
    result = AMparseSexpr(str);
    if (result[0] == null) // show box in place of missing argument
      result[0] = createMmlNode("mo",document.createTextNode("\u25A1"));
    else AMremoveBrackets(result[0]);
    str = result[1];
//    if (symbol.input == "/") AMremoveBrackets(node);
    underover = (sym1.ttype == UNDEROVER || sym1.ttype == UNARYUNDEROVER);
    if (symbol.input == "_") {
      sym2 = AMgetSymbol(str);
      if (sym2.input == "^") {
        str = AMremoveCharsAndBlanks(str,sym2.input.length);
        var res2 = AMparseSexpr(str);
        AMremoveBrackets(res2[0]);
        str = res2[1];
        node = createMmlNode((underover?"munderover":"msubsup"),node);
        node.appendChild(result[0]);
        node.appendChild(res2[0]);
        node = createMmlNode("mrow",node); // so sum does not stretch
      } else {
        node = createMmlNode((underover?"munder":"msub"),node);
        node.appendChild(result[0]);
      }
    } else if (symbol.input == "^" && underover) {
    	node = createMmlNode("mover",node);
        node.appendChild(result[0]);
    } else {
      node = createMmlNode(symbol.tag,node);
      node.appendChild(result[0]);
    }
    if (typeof sym1.func != 'undefined' && sym1.func) {
    	sym2 = AMgetSymbol(str);
    	if (sym2.ttype != INFIX && sym2.ttype != RIGHTBRACKET) {
    		result = AMparseIexpr(str);
    		node = createMmlNode("mrow",node);
    		node.appendChild(result[0]);
    		str = result[1];
    	}
    }
  }
  return [node,str];
}