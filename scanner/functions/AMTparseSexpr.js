function AMTparseSexpr(str) { //parses str and returns [node,tailstr]
  var symbol, node, result, i, st,// rightvert = false,
    newFrag = '';
  str = AMremoveCharsAndBlanks(str,0);
  symbol = AMgetSymbol(str);             //either a token or a bracket or empty
  if (symbol == null || symbol.ttype == RIGHTBRACKET && AMnestingDepth > 0) {
    return [null,str];
  }
  if (symbol.ttype == DEFINITION) {
    str = symbol.output+AMremoveCharsAndBlanks(str,symbol.input.length);
    symbol = AMgetSymbol(str);
  }
  switch (symbol.ttype) {
  case UNDEROVER:
  case CONST:
    str = AMremoveCharsAndBlanks(str,symbol.input.length);
     var texsymbol = AMTgetTeXsymbol(symbol);
     if (texsymbol.charAt(0)=="\\" || symbol.tag=="mo") return [texsymbol,str];
     else return ['{'+texsymbol+'}',str];

  case LEFTBRACKET:   //read (expr+)
    AMnestingDepth++;
    str = AMremoveCharsAndBlanks(str,symbol.input.length);

    result = AMTparseExpr(str,true);
    AMnestingDepth--;
    var leftchop = 0;
    if (result[0].substr(0,6)=="\\right") {
    	    st = result[0].charAt(6);
    	    if (st==")" || st=="]" || st=="}") {
    	    	    leftchop = 6;
    	    } else if (st==".") {
    	    	    leftchop = 7;
    	    } else {
    	    	    st = result[0].substr(6,7);
    	    	    if (st=='\\rbrace') {
    	    	    	    leftchop = 13;
    	    	    }
    	    }
    }
    if (leftchop>0) {
	    result[0] = result[0].substr(leftchop);
	    if (typeof symbol.invisible == "boolean" && symbol.invisible)
		    node = '{'+result[0]+'}';
	    else {
		    node = '{'+AMTgetTeXsymbol(symbol) + result[0]+'}';
	    }
    } else {
	    if (typeof symbol.invisible == "boolean" && symbol.invisible)
		    node = '{\\left.'+result[0]+'}';
	    else {
		    node = '{\\left'+AMTgetTeXsymbol(symbol) + result[0]+'}';
	    }
    }
    return [node,result[1]];
  case TEXT:
      if (symbol!=AMquote) str = AMremoveCharsAndBlanks(str,symbol.input.length);
      if (str.charAt(0)=="{") i=str.indexOf("}");
      else if (str.charAt(0)=="(") i=str.indexOf(")");
      else if (str.charAt(0)=="[") i=str.indexOf("]");
      else if (symbol==AMquote) i=str.slice(1).indexOf("\"")+1;
      else i = 0;
      if (i==-1) i = str.length;
      st = str.slice(1,i);
      if (st.charAt(0) == " ") {
	      newFrag = '\\ ';
      }
     newFrag += '\\text{'+st+'}';
      if (st.charAt(st.length-1) == " ") {
	      newFrag += '\\ ';
      }
      str = AMremoveCharsAndBlanks(str,i+1);
      return [newFrag,str];
  case UNARY:
      str = AMremoveCharsAndBlanks(str,symbol.input.length);
      result = AMTparseSexpr(str);
      if (result[0]==null) return ['{'+AMTgetTeXsymbol(symbol)+'}',str];
      if (typeof symbol.func == "boolean" && symbol.func) { // functions hack
        st = str.charAt(0);
        if (st=="^" || st=="_" || st=="/" || st=="|" || st=="," || (symbol.input.length==1 && symbol.input.match(/\w/) && st!="(")) {
          return ['{'+AMTgetTeXsymbol(symbol)+'}',str];
        } else {
		node = '{'+AMTgetTeXsymbol(symbol)+'{'+result[0]+'}}';
		return [node,result[1]];
        }
      }
      result[0] = AMTremoveBrackets(result[0]);
      if (symbol.input == "sqrt") {           // sqrt
	      return ['\\sqrt{'+result[0]+'}',result[1]];
      } else if (symbol.input == "cancel") {           // cancel
	      return ['\\cancel{'+result[0]+'}',result[1]];
      } else if (typeof symbol.rewriteleftright != "undefined") {  // abs, floor, ceil
	      return ['{\\left'+symbol.rewriteleftright[0]+result[0]+'\\right'+symbol.rewriteleftright[1]+'}',result[1]];
      } else if (typeof symbol.acc == "boolean" && symbol.acc) {   // accent
	      //return ['{'+AMTgetTeXsymbol(symbol)+'{'+result[0]+'}}',result[1]];
	      return [AMTgetTeXsymbol(symbol)+'{'+result[0]+'}',result[1]];
      } else {                        // font change command
	    return ['{'+AMTgetTeXsymbol(symbol)+'{'+result[0]+'}}',result[1]];
      }
  case BINARY:
    str = AMremoveCharsAndBlanks(str,symbol.input.length);
    result = AMTparseSexpr(str);
    if (result[0]==null) return ['{'+AMTgetTeXsymbol(symbol)+'}',str];
    result[0] = AMTremoveBrackets(result[0]);
    var result2 = AMTparseSexpr(result[1]);
    if (result2[0]==null) return ['{'+AMTgetTeXsymbol(symbol)+'}',str];
    result2[0] = AMTremoveBrackets(result2[0]);
    if (symbol.input=="color") {
    	newFrag = '{\\color{'+result[0].replace(/[\{\}]/g,'')+'}'+result2[0]+'}';
    } else  if (symbol.input=="root") {
	    newFrag = '{\\sqrt['+result[0]+']{'+result2[0]+'}}';
    } else {
	    newFrag = '{'+AMTgetTeXsymbol(symbol)+'{'+result[0]+'}{'+result2[0]+'}}';
    }
    return [newFrag,result2[1]];
  case INFIX:
    str = AMremoveCharsAndBlanks(str,symbol.input.length);
    return [symbol.output,str];
  case SPACE:
    str = AMremoveCharsAndBlanks(str,symbol.input.length);
    return ['{\\quad\\text{'+symbol.input+'}\\quad}',str];
  case LEFTRIGHT:
//    if (rightvert) return [null,str]; else rightvert = true;
    AMnestingDepth++;
    str = AMremoveCharsAndBlanks(str,symbol.input.length);
    result = AMTparseExpr(str,false);
    AMnestingDepth--;
    var st = "";
    st = result[0].charAt(result[0].length -1);
//alert(result[0].lastChild+"***"+st);
    if (st == "|" && str.charAt(0)!==",") { // its an absolute value subterm
	    node = '{\\left|'+result[0]+'}';
      return [node,result[1]];
    } else { // the "|" is a \mid
      node = '{\\mid}';
      return [node,str];
    }

  default:
//alert("default");
    str = AMremoveCharsAndBlanks(str,symbol.input.length);
    return ['{'+AMTgetTeXsymbol(symbol)+'}',str];
  }
}