function AMparseExpr(str,rightbracket) {
  var symbol, node, result, i,
  newFrag = document.createDocumentFragment();
  do {
    str = AMremoveCharsAndBlanks(str,0);
    result = AMparseIexpr(str);
    node = result[0];
    str = result[1];
    symbol = AMgetSymbol(str);
    if (symbol.ttype == INFIX && symbol.input == "/") {
      str = AMremoveCharsAndBlanks(str,symbol.input.length);
      result = AMparseIexpr(str);
      if (result[0] == null) // show box in place of missing argument
        result[0] = createMmlNode("mo",document.createTextNode("\u25A1"));
      else AMremoveBrackets(result[0]);
      str = result[1];
      AMremoveBrackets(node);
      node = createMmlNode(symbol.tag,node);
      node.appendChild(result[0]);
      newFrag.appendChild(node);
      symbol = AMgetSymbol(str);
    }
    else if (node!=undefined) newFrag.appendChild(node);
  } while ((symbol.ttype != RIGHTBRACKET &&
           (symbol.ttype != LEFTRIGHT || rightbracket)
           || AMnestingDepth == 0) && symbol!=null && symbol.output!="");
  if (symbol.ttype == RIGHTBRACKET || symbol.ttype == LEFTRIGHT) {
//    if (AMnestingDepth > 0) AMnestingDepth--;
    var len = newFrag.childNodes.length;
    if (len>0 && newFrag.childNodes[len-1].nodeName == "mrow"
    	    && newFrag.childNodes[len-1].lastChild
    	    && newFrag.childNodes[len-1].lastChild.firstChild ) { //matrix
    	    //removed to allow row vectors: //&& len>1 &&
    	    //newFrag.childNodes[len-2].nodeName == "mo" &&
    	    //newFrag.childNodes[len-2].firstChild.nodeValue == ","
      var right = newFrag.childNodes[len-1].lastChild.firstChild.nodeValue;
      if (right==")" || right=="]") {
        var left = newFrag.childNodes[len-1].firstChild.firstChild.nodeValue;
        if (left=="(" && right==")" && symbol.output != "}" ||
            left=="[" && right=="]") {
        var pos = []; // positions of commas
        var matrix = true;
        var m = newFrag.childNodes.length;
        for (i=0; matrix && i<m; i=i+2) {
          pos[i] = [];
          node = newFrag.childNodes[i];
          if (matrix) matrix = node.nodeName=="mrow" &&
            (i==m-1 || node.nextSibling.nodeName=="mo" &&
            node.nextSibling.firstChild.nodeValue==",")&&
            node.firstChild.firstChild.nodeValue==left &&
            node.lastChild.firstChild.nodeValue==right;
          if (matrix)
            for (var j=0; j<node.childNodes.length; j++)
              if (node.childNodes[j].firstChild.nodeValue==",")
                pos[i][pos[i].length]=j;
          if (matrix && i>1) matrix = pos[i].length == pos[i-2].length;
        }
        matrix = matrix && (pos.length>1 || pos[0].length>0);
        var columnlines = [];
        if (matrix) {
          var row, frag, n, k, table = document.createDocumentFragment();
          for (i=0; i<m; i=i+2) {
            row = document.createDocumentFragment();
            frag = document.createDocumentFragment();
            node = newFrag.firstChild; // <mrow>(-,-,...,-,-)</mrow>
            n = node.childNodes.length;
            k = 0;
            node.removeChild(node.firstChild); //remove (
            for (j=1; j<n-1; j++) {
              if (typeof pos[i][k] != "undefined" && j==pos[i][k]){
                node.removeChild(node.firstChild); //remove ,
                if (node.firstChild.nodeName=="mrow" && node.firstChild.childNodes.length==1 &&
         	  node.firstChild.firstChild.firstChild.nodeValue=="\u2223") {
         	    //is columnline marker - skip it
         	    if (i==0) { columnlines.push("solid"); }
         	    node.removeChild(node.firstChild); //remove mrow
         	    node.removeChild(node.firstChild); //remove ,
         	    j+=2;
         	    k++;
            	} else if (i==0) { columnlines.push("none"); }
                row.appendChild(createMmlNode("mtd",frag));
                k++;
              } else frag.appendChild(node.firstChild);
            }
            row.appendChild(createMmlNode("mtd",frag));
            if (i==0) { columnlines.push("none"); }
            if (newFrag.childNodes.length>2) {
              newFrag.removeChild(newFrag.firstChild); //remove <mrow>)</mrow>
              newFrag.removeChild(newFrag.firstChild); //remove <mo>,</mo>
            }
            table.appendChild(createMmlNode("mtr",row));
          }
          node = createMmlNode("mtable",table);
          node.setAttribute("columnlines", columnlines.join(" "));
          if (typeof symbol.invisible == "boolean" && symbol.invisible) node.setAttribute("columnalign","left");
          newFrag.replaceChild(node,newFrag.firstChild);
        }
       }
      }
    }
    str = AMremoveCharsAndBlanks(str,symbol.input.length);
    if (typeof symbol.invisible != "boolean" || !symbol.invisible) {
      node = createMmlNode("mo",document.createTextNode(symbol.output));
      newFrag.appendChild(node);
    }
  }
  return [newFrag,str];
}