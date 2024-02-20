function AMparseSexpr(str) { //parses str and returns [node,tailstr]
  var symbol, node, result, i, st,// rightvert = false,
    newFrag = document.createDocumentFragment();
  str = AMremoveCharsAndBlanks(str,0);
  symbol = AMgetSymbol(str);             //either a token or a bracket or empty
  if (symbol == null || symbol.ttype == RIGHTBRACKET && AMnestingDepth > 0) {
    return [null,str];
  }
  if (symbol.ttype == DEFINITION) {
    str = symbol.output+AMremoveCharsAndBlanks(str,symbol.input.length);
    symbol = AMgetSymbol(str);
  }
  switch (symbol.ttype) {  case UNDEROVER:
  case CONST:
    str = AMremoveCharsAndBlanks(str,symbol.input.length);
    return [createMmlNode(symbol.tag,        //its a constant
                             document.createTextNode(symbol.output)),str];
  case LEFTBRACKET:   //read (expr+)
    AMnestingDepth++;
    str = AMremoveCharsAndBlanks(str,symbol.input.length);
    result = AMparseExpr(str,true);
    AMnestingDepth--;
    if (typeof symbol.invisible == "boolean" && symbol.invisible)
      node = createMmlNode("mrow",result[0]);
    else {
      node = createMmlNode("mo",document.createTextNode(symbol.output));
      node = createMmlNode("mrow",node);
      node.appendChild(result[0]);
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
        node = createMmlNode("mspace");
        node.setAttribute("width","1ex");
        newFrag.appendChild(node);
      }
      newFrag.appendChild(
        createMmlNode(symbol.tag,document.createTextNode(st)));
      if (st.charAt(st.length-1) == " ") {
        node = createMmlNode("mspace");
        node.setAttribute("width","1ex");
        newFrag.appendChild(node);
      }
      str = AMremoveCharsAndBlanks(str,i+1);
      return [createMmlNode("mrow",newFrag),str];
  case UNARYUNDEROVER:
  case UNARY:
      str = AMremoveCharsAndBlanks(str,symbol.input.length);
      result = AMparseSexpr(str);
      if (result[0]==null) return [createMmlNode(symbol.tag,
                             document.createTextNode(symbol.output)),str];
      if (typeof symbol.func == "boolean" && symbol.func) { // functions hack
        st = str.charAt(0);
          if (st=="^" || st=="_" || st=="/" || st=="|" || st=="," ||
             (symbol.input.length==1 && symbol.input.match(/\w/) && st!="(")) {
          return [createMmlNode(symbol.tag,
                    document.createTextNode(symbol.output)),str];
        } else {
          node = createMmlNode("mrow",
           createMmlNode(symbol.tag,document.createTextNode(symbol.output)));
          node.appendChild(result[0]);
          return [node,result[1]];
        }
      }
      AMremoveBrackets(result[0]);
      if (symbol.input == "sqrt") {           // sqrt
        return [createMmlNode(symbol.tag,result[0]),result[1]];
      } else if (typeof symbol.rewriteleftright != "undefined") {    // abs, floor, ceil
          node = createMmlNode("mrow", createMmlNode("mo",document.createTextNode(symbol.rewriteleftright[0])));
          node.appendChild(result[0]);
          node.appendChild(createMmlNode("mo",document.createTextNode(symbol.rewriteleftright[1])));
          return [node,result[1]];
      } else if (symbol.input == "cancel") {   // cancel
        node = createMmlNode(symbol.tag,result[0]);
	node.setAttribute("notation","updiagonalstrike");
	return [node,result[1]];
      } else if (typeof symbol.acc == "boolean" && symbol.acc) {   // accent
        node = createMmlNode(symbol.tag,result[0]);
        var accnode = createMmlNode("mo",document.createTextNode(symbol.output));
        if (symbol.input=="vec" && (
		(result[0].nodeName=="mrow" && result[0].childNodes.length==1
			&& result[0].firstChild.firstChild.nodeValue !== null
			&& result[0].firstChild.firstChild.nodeValue.length==1) ||
		(result[0].firstChild.nodeValue !== null
			&& result[0].firstChild.nodeValue.length==1) )) {
			accnode.setAttribute("stretchy",false);
        }
        node.appendChild(accnode);
        return [node,result[1]];
      } else {                        // font change command
        if (!isIE && typeof symbol.codes != "undefined") {
          for (i=0; i<result[0].childNodes.length; i++)
            if (result[0].childNodes[i].nodeName=="mi" || result[0].nodeName=="mi") {
              st = (result[0].nodeName=="mi"?result[0].firstChild.nodeValue:
                              result[0].childNodes[i].firstChild.nodeValue);
              var newst = [];
              for (var j=0; j<st.length; j++)
		  if (st.charCodeAt(j)>64 && st.charCodeAt(j)<91)
		  	newst = newst + symbol.codes[st.charCodeAt(j)-65];
                else if (st.charCodeAt(j)>96 && st.charCodeAt(j)<123)
                	newst = newst + symbol.codes[st.charCodeAt(j)-71];
                else newst = newst + st.charAt(j);
              if (result[0].nodeName=="mi")
                result[0]=createMmlNode("mo").
                          appendChild(document.createTextNode(newst));
              else result[0].replaceChild(createMmlNode("mo").
                               appendChild(document.createTextNode(newst)),
                                           result[0].childNodes[i]);
            }
        }
        node = createMmlNode(symbol.tag,result[0]);
        node.setAttribute(symbol.atname,symbol.atval);
        return [node,result[1]];
      }
  case BINARY:
    str = AMremoveCharsAndBlanks(str,symbol.input.length);
    result = AMparseSexpr(str);
    if (result[0]==null) return [createMmlNode("mo",
                           document.createTextNode(symbol.input)),str];
    AMremoveBrackets(result[0]);
    var result2 = AMparseSexpr(result[1]);
    if (result2[0]==null) return [createMmlNode("mo",
                           document.createTextNode(symbol.input)),str];
    AMremoveBrackets(result2[0]);
    if (['color', 'class', 'id'].indexOf(symbol.input) >= 0) {

      // Get the second argument
    	if (str.charAt(0)=="{") i=str.indexOf("}");
      else if (str.charAt(0)=="(") i=str.indexOf(")");
      else if (str.charAt(0)=="[") i=str.indexOf("]");
    	st = str.slice(1,i);

      // Make a mathml node
    	node = createMmlNode(symbol.tag,result2[0]);

      // Set the correct attribute
      if (symbol.input === "color") node.setAttribute("mathcolor", st)
      else if (symbol.input === "class") node.setAttribute("class", st)
      else if (symbol.input === "id") node.setAttribute("id", st)
   	return [node,result2[1]];
    }
    if (symbol.input=="root" || symbol.output=="stackrel")
      newFrag.appendChild(result2[0]);
    newFrag.appendChild(result[0]);
    if (symbol.input=="frac") newFrag.appendChild(result2[0]);
    return [createMmlNode(symbol.tag,newFrag),result2[1]];
  case INFIX:
    str = AMremoveCharsAndBlanks(str,symbol.input.length);
    return [createMmlNode("mo",document.createTextNode(symbol.output)),str];
  case SPACE:
    str = AMremoveCharsAndBlanks(str,symbol.input.length);
    node = createMmlNode("mspace");
    node.setAttribute("width","1ex");
    newFrag.appendChild(node);
    newFrag.appendChild(
      createMmlNode(symbol.tag,document.createTextNode(symbol.output)));
    node = createMmlNode("mspace");
    node.setAttribute("width","1ex");
    newFrag.appendChild(node);
    return [createMmlNode("mrow",newFrag),str];
  case LEFTRIGHT:
//    if (rightvert) return [null,str]; else rightvert = true;
    AMnestingDepth++;
    str = AMremoveCharsAndBlanks(str,symbol.input.length);
    result = AMparseExpr(str,false);
    AMnestingDepth--;
    st = "";
    if (result[0].lastChild!=null)
      st = result[0].lastChild.firstChild.nodeValue;
    if (st == "|" && str.charAt(0)!==",") { // its an absolute value subterm
      node = createMmlNode("mo",document.createTextNode(symbol.output));
      node = createMmlNode("mrow",node);
      node.appendChild(result[0]);
      return [node,result[1]];
    } else { // the "|" is a \mid so use unicode 2223 (divides) for spacing
      node = createMmlNode("mo",document.createTextNode("\u2223"));
      node = createMmlNode("mrow",node);
      return [node,str];
    }
  default:
//alert("default");
    str = AMremoveCharsAndBlanks(str,symbol.input.length);
    return [createMmlNode(symbol.tag,        //its a constant
                             document.createTextNode(symbol.output)),str];
  }
}