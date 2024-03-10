function LMparseSexpr(str) { //parses str and returns [node,tailstr,(node)tag]
  var symbol, node, result, result2, i, st,// rightvert = false,
    newFrag = document.createDocumentFragment();
  str = LMremoveCharsAndBlanks(str,0);
  symbol = LMgetSymbol(str);             //either a token or a bracket or empty
  if (symbol == null || symbol.ttype == RIGHTBRACKET)
    return [null,str,null];
  if (symbol.ttype == DEFINITION) {
    str = symbol.output+LMremoveCharsAndBlanks(str,symbol.input.length);
    symbol = LMgetSymbol(str);
    if (symbol == null || symbol.ttype == RIGHTBRACKET)
      return [null,str,null];
  }
  str = LMremoveCharsAndBlanks(str,symbol.input.length);
  switch (symbol.ttype) {
  case SPACE:
    node = LMcreateElementMathML(symbol.tag);
    node.setAttribute(symbol.atname,symbol.atval);
    return [node,str,symbol.tag];
  case UNDEROVER:
    if (isIE) {
      if (symbol.input.substr(0,4) == "\\big") {   // botch for missing symbols
	str = "\\"+symbol.input.substr(4)+str;	   // make \bigcup = \cup etc.
	symbol = LMgetSymbol(str);
	symbol.ttype = UNDEROVER;
	str = LMremoveCharsAndBlanks(str,symbol.input.length);
      }
    }
    return [LMcreateMmlNode(symbol.tag,
			document.createTextNode(symbol.output)),str,symbol.tag];
  case CONST:
    var output = symbol.output;
    if (isIE) {
      if (symbol.input == "'")
	output = "\u2032";
      else if (symbol.input == "''")
	output = "\u2033";
      else if (symbol.input == "'''")
	output = "\u2033\u2032";
      else if (symbol.input == "''''")
	output = "\u2033\u2033";
      else if (symbol.input == "\\square")
	output = "\u25A1";	// same as \Box
      else if (symbol.input.substr(0,5) == "\\frac") {
						// botch for missing fractions
	var denom = symbol.input.substr(6,1);
	if (denom == "5" || denom == "6") {
	  str = symbol.input.replace(/\\frac/,"\\frac ")+str;
	  return [node,str,symbol.tag];
	}
      }
    }
    node = LMcreateMmlNode(symbol.tag,document.createTextNode(output));
    return [node,str,symbol.tag];
  case LONG:  // added by DRW
    node = LMcreateMmlNode(symbol.tag,document.createTextNode(symbol.output));
    node.setAttribute("minsize","1.5");
    node.setAttribute("maxsize","1.5");
    node = LMcreateMmlNode("mover",node);
    node.appendChild(LMcreateElementMathML("mspace"));
    return [node,str,symbol.tag];
  case STRETCHY:  // added by DRW
    if (isIE && symbol.input == "\\backslash")
	symbol.output = "\\";	// doesn't expand, but then nor does "\u2216"
    node = LMcreateMmlNode(symbol.tag,document.createTextNode(symbol.output));
    if (symbol.input == "|" || symbol.input == "\\vert" ||
	symbol.input == "\\|" || symbol.input == "\\Vert") {
	  node.setAttribute("lspace","0em");
	  node.setAttribute("rspace","0em");
    }
    node.setAttribute("maxsize",symbol.atval);  // don't allow to stretch here
    if (symbol.rtag != null)
      return [node,str,symbol.rtag];
    else
      return [node,str,symbol.tag];
  case BIG:  // added by DRW
    var atval = symbol.atval;
    if (isIE)
      atval = symbol.ieval;
    symbol = LMgetSymbol(str);
    if (symbol == null)
	return [null,str,null];
    str = LMremoveCharsAndBlanks(str,symbol.input.length);
    node = LMcreateMmlNode(symbol.tag,document.createTextNode(symbol.output));
    if (isIE) {		// to get brackets to expand
      var space = LMcreateElementMathML("mspace");
      space.setAttribute("height",atval+"ex");
      node = LMcreateMmlNode("mrow",node);
      node.appendChild(space);
    } else {		// ignored in IE
      node.setAttribute("minsize",atval);
      node.setAttribute("maxsize",atval);
    }
    return [node,str,symbol.tag];
  case LEFTBRACKET:   //read (expr+)
    if (symbol.input == "\\left") { // left what?
      symbol = LMgetSymbol(str);
      if (symbol != null) {
	if (symbol.input == ".")
	  symbol.invisible = true;
	str = LMremoveCharsAndBlanks(str,symbol.input.length);
      }
    }
    result = LMparseExpr(str,true,false);
    if (symbol==null ||
	(typeof symbol.invisible == "boolean" && symbol.invisible))
      node = LMcreateMmlNode("mrow",result[0]);
    else {
      node = LMcreateMmlNode("mo",document.createTextNode(symbol.output));
      node = LMcreateMmlNode("mrow",node);
      node.appendChild(result[0]);
    }
    return [node,result[1],result[2]];
  case MATRIX:	 //read (expr+)
    if (symbol.input == "\\begin{array}") {
      var mask = "";
      symbol = LMgetSymbol(str);
      str = LMremoveCharsAndBlanks(str,0);
      if (symbol == null)
	mask = "l";
      else {
	str = LMremoveCharsAndBlanks(str,symbol.input.length);
	if (symbol.input != "{")
	  mask = "l";
	else do {
	  symbol = LMgetSymbol(str);
	  if (symbol != null) {
	    str = LMremoveCharsAndBlanks(str,symbol.input.length);
	    if (symbol.input != "}")
	      mask = mask+symbol.input;
	  }
	} while (symbol != null && symbol.input != "" && symbol.input != "}");
      }
      result = LMparseExpr("{"+str,true,true);
//    if (result[0]==null) return [LMcreateMmlNode("mo",
//			   document.createTextNode(symbol.input)),str];
      node = LMcreateMmlNode("mtable",result[0]);
      mask = mask.replace(/l/g,"left ");
      mask = mask.replace(/r/g,"right ");
      mask = mask.replace(/c/g,"center ");
      node.setAttribute("columnalign",mask);
      node.setAttribute("displaystyle","false");
      if (isIE)
	return [node,result[1],null];
// trying to get a *little* bit of space around the array
// (IE already includes it)
      var lspace = LMcreateElementMathML("mspace");
      lspace.setAttribute("width","0.167em");
      var rspace = LMcreateElementMathML("mspace");
      rspace.setAttribute("width","0.167em");
      var node1 = LMcreateMmlNode("mrow",lspace);
      node1.appendChild(node);
      node1.appendChild(rspace);
      return [node1,result[1],null];
    } else {	// eqnarray
      result = LMparseExpr("{"+str,true,true);
      node = LMcreateMmlNode("mtable",result[0]);
      if (isIE)
	node.setAttribute("columnspacing","0.25em"); // best in practice?
      else
	node.setAttribute("columnspacing","0.167em"); // correct (but ignored?)
      node.setAttribute("columnalign","right center left");
      node.setAttribute("displaystyle","true");
      node = LMcreateMmlNode("mrow",node);
      return [node,result[1],null];
    }
  case TEXT:
      if (str.charAt(0)=="{") i=str.indexOf("}");
      else i = 0;
      if (i==-1)
		 i = str.length;
      st = str.slice(1,i);
      if (st.charAt(0) == " ") {
	node = LMcreateElementMathML("mspace");
	node.setAttribute("width","0.33em");	// was 1ex
	newFrag.appendChild(node);
      }
      newFrag.appendChild(
        LMcreateMmlNode(symbol.tag,document.createTextNode(st)));
      if (st.charAt(st.length-1) == " ") {
	node = LMcreateElementMathML("mspace");
	node.setAttribute("width","0.33em");	// was 1ex
	newFrag.appendChild(node);
      }
      str = LMremoveCharsAndBlanks(str,i+1);
      return [LMcreateMmlNode("mrow",newFrag),str,null];
  case UNARY:
      result = LMparseSexpr(str);
      if (result[0]==null) return [LMcreateMmlNode(symbol.tag,
                             document.createTextNode(symbol.output)),str];
      if (typeof symbol.func == "boolean" && symbol.func) { // functions hack
	st = str.charAt(0);
//	if (st=="^" || st=="_" || st=="/" || st=="|" || st==",") {
	if (st=="^" || st=="_" || st==",") {
	  return [LMcreateMmlNode(symbol.tag,
		    document.createTextNode(symbol.output)),str,symbol.tag];
        } else {
	  node = LMcreateMmlNode("mrow",
	   LMcreateMmlNode(symbol.tag,document.createTextNode(symbol.output)));
	  if (isIE) {
	    var space = LMcreateElementMathML("mspace");
	    space.setAttribute("width","0.167em");
	    node.appendChild(space);
	  }
	  node.appendChild(result[0]);
	  return [node,result[1],symbol.tag];
        }
      }
      if (symbol.input == "\\sqrt") {		// sqrt
	if (isIE) {	// set minsize, for \surd
	  var space = LMcreateElementMathML("mspace");
	  space.setAttribute("height","1.2ex");
	  space.setAttribute("width","0em");	// probably no effect
	  node = LMcreateMmlNode(symbol.tag,result[0])
//	  node.setAttribute("minsize","1");	// ignored
//	  node = LMcreateMmlNode("mrow",node);  // hopefully unnecessary
	  node.appendChild(space);
	  return [node,result[1],symbol.tag];
	} else
	  return [LMcreateMmlNode(symbol.tag,result[0]),result[1],symbol.tag];
      } else if (typeof symbol.acc == "boolean" && symbol.acc) {   // accent
        node = LMcreateMmlNode(symbol.tag,result[0]);
	var output = symbol.output;
	if (isIE) {
		if (symbol.input == "\\hat")
			output = "\u0302";
		else if (symbol.input == "\\widehat")
			output = "\u005E";
		else if (symbol.input == "\\bar")
			output = "\u00AF";
		else if (symbol.input == "\\grave")
			output = "\u0300";
		else if (symbol.input == "\\tilde")
			output = "\u0303";
	}
	var node1 = LMcreateMmlNode("mo",document.createTextNode(output));
	if (symbol.input == "\\vec" || symbol.input == "\\check")
						// don't allow to stretch
	    node1.setAttribute("maxsize","1.2");
		 // why doesn't "1" work?  \vec nearly disappears in firefox
	if (isIE && symbol.input == "\\bar")
	    node1.setAttribute("maxsize","0.5");
	if (symbol.input == "\\underbrace" || symbol.input == "\\underline")
	  node1.setAttribute("accentunder","true");
	else
	  node1.setAttribute("accent","true");
	node.appendChild(node1);
	if (symbol.input == "\\overbrace" || symbol.input == "\\underbrace")
	  node.ttype = UNDEROVER;
	return [node,result[1],symbol.tag];
      } else {			      // font change or displaystyle command
        if (!isIE && typeof symbol.codes != "undefined") {
          for (i=0; i<result[0].childNodes.length; i++)
            if (result[0].childNodes[i].nodeName=="mi" || result[0].nodeName=="mi") {
              st = (result[0].nodeName=="mi"?result[0].firstChild.nodeValue:
                              result[0].childNodes[i].firstChild.nodeValue);
              var newst = [];
              for (var j=0; j<st.length; j++)
		if (st.charCodeAt(j)>64 && st.charCodeAt(j)<91) newst
= newst +
                    symbol.codes[st.charCodeAt(j)-65];
                else if (st.charCodeAt(j)>96 && st.charCodeAt(j)<123)
newst = newst +
                    symbol.codes[st.charCodeAt(j)-71];
                else newst = newst + st.charAt(j);
              if (result[0].nodeName=="mi")
                result[0]=LMcreateElementMathML("mo").
                          appendChild(document.createTextNode(newst));
              else result[0].replaceChild(LMcreateElementMathML("mo").
          appendChild(document.createTextNode(newst)),result[0].childNodes[i]);
            }
        }
        node = LMcreateMmlNode(symbol.tag,result[0]);
        node.setAttribute(symbol.atname,symbol.atval);
	if (symbol.input == "\\scriptstyle" ||
	    symbol.input == "\\scriptscriptstyle")
		node.setAttribute("displaystyle","false");
	return [node,result[1],symbol.tag];
      }
  case BINARY:
    result = LMparseSexpr(str);
    if (result[0]==null) return [LMcreateMmlNode("mo",
			   document.createTextNode(symbol.input)),str,null];
    result2 = LMparseSexpr(result[1]);
    if (result2[0]==null) return [LMcreateMmlNode("mo",
			   document.createTextNode(symbol.input)),str,null];
    if (symbol.input=="\\root" || symbol.input=="\\stackrel")
      newFrag.appendChild(result2[0]);
    newFrag.appendChild(result[0]);
    if (symbol.input=="\\frac") newFrag.appendChild(result2[0]);
    return [LMcreateMmlNode(symbol.tag,newFrag),result2[1],symbol.tag];
  case INFIX:
    str = LMremoveCharsAndBlanks(str,symbol.input.length);
    return [LMcreateMmlNode("mo",document.createTextNode(symbol.output)),
	str,symbol.tag];
  default:
    return [LMcreateMmlNode(symbol.tag,        //its a constant
	document.createTextNode(symbol.output)),str,symbol.tag];
  }
}