function AMTparseIexpr(str) {
  var symbol, sym1, sym2, node, result;
  str = AMremoveCharsAndBlanks(str,0);
  sym1 = AMgetSymbol(str);
  result = AMTparseSexpr(str);
  node = result[0];
  str = result[1];
  symbol = AMgetSymbol(str);
  if (symbol.ttype == INFIX && symbol.input != "/") {
    str = AMremoveCharsAndBlanks(str,symbol.input.length);
   // if (symbol.input == "/") result = AMTparseIexpr(str); else
    result = AMTparseSexpr(str);
    if (result[0] == null) // show box in place of missing argument
	    result[0] = '{}';
    else result[0] = AMTremoveBrackets(result[0]);
    str = result[1];
//    if (symbol.input == "/") AMTremoveBrackets(node);
    if (symbol.input == "_") {
      sym2 = AMgetSymbol(str);
      if (sym2.input == "^") {
        str = AMremoveCharsAndBlanks(str,sym2.input.length);
        var res2 = AMTparseSexpr(str);
        res2[0] = AMTremoveBrackets(res2[0]);
        str = res2[1];
        node = '{' + node;
       	node += '_{'+result[0]+'}';
	node += '^{'+res2[0]+'}';
        node += '}';
      } else {
        node += '_{'+result[0]+'}';
      }
    } else { //must be ^
      //node = '{'+node+'}^{'+result[0]+'}';
      node = node+'^{'+result[0]+'}';
    }
    if (typeof sym1.func != 'undefined' && sym1.func) {
    	sym2 = AMgetSymbol(str);
    	if (sym2.ttype != INFIX && sym2.ttype != RIGHTBRACKET &&
    	    (sym1.input.length>1 || sym2.ttype == LEFTBRACKET)) {
    		result = AMTparseIexpr(str);
    		node = '{'+node+result[0]+'}';
    		str = result[1];
    	}
    }
  }

  return [node,str];
}