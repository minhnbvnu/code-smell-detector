function AMTparseExpr(str,rightbracket) {
  var symbol, node, result, i, nodeList = [],
  newFrag = '';
  var addedright = false;
  do {
    str = AMremoveCharsAndBlanks(str,0);
    result = AMTparseIexpr(str);
    node = result[0];
    str = result[1];
    symbol = AMgetSymbol(str);
    if (symbol.ttype == INFIX && symbol.input == "/") {
      str = AMremoveCharsAndBlanks(str,symbol.input.length);
      result = AMTparseIexpr(str);

      if (result[0] == null) // show box in place of missing argument
	      result[0] = '{}';
      else result[0] = AMTremoveBrackets(result[0]);
      str = result[1];
      node = AMTremoveBrackets(node);
      node = '\\frac' + '{'+ node + '}';
      node += '{'+result[0]+'}';
      newFrag += node;
      symbol = AMgetSymbol(str);
    }  else if (node!=undefined) newFrag += node;
  } while ((symbol.ttype != RIGHTBRACKET &&
           (symbol.ttype != LEFTRIGHT || rightbracket)
           || AMnestingDepth == 0) && symbol!=null && symbol.output!="");
  if (symbol.ttype == RIGHTBRACKET || symbol.ttype == LEFTRIGHT) {
//    if (AMnestingDepth > 0) AMnestingDepth--;
	var len = newFrag.length;
	if (len>2 && newFrag.charAt(0)=='{' && newFrag.indexOf(',')>0) { //could be matrix (total rewrite from .js)
		var right = newFrag.charAt(len - 2);
		if (right==')' || right==']') {
			var left = newFrag.charAt(6);
			if ((left=='(' && right==')' && symbol.output != '}') || (left=='[' && right==']')) {
				var mxout = '';
				var pos = new Array(); //position of commas
				pos.push(0);
				var matrix = true;
				var mxnestingd = 0;
				var subpos = [];
				subpos[0] = [0];
				var lastsubposstart = 0;
				var mxanynestingd = 0;
				var columnaligns = '';
				for (i=1; i<len-1; i++) {
					if (newFrag.charAt(i)==left) mxnestingd++;
					if (newFrag.charAt(i)==right) {
						mxnestingd--;
						if (mxnestingd==0 && newFrag.charAt(i+2)==',' && newFrag.charAt(i+3)=='{') {
							pos.push(i+2);
							lastsubposstart = i+2;
							subpos[lastsubposstart] = [i+2];
						}
					}
					if (newFrag.charAt(i)=='[' || newFrag.charAt(i)=='(' || newFrag.charAt(i)=='{') { mxanynestingd++;}
					if (newFrag.charAt(i)==']' || newFrag.charAt(i)==')' || newFrag.charAt(i)=='}') { mxanynestingd--;}
					if (newFrag.charAt(i)==',' && mxanynestingd==1) {
						subpos[lastsubposstart].push(i);
					}
					if (mxanynestingd<0) {  //happens at the end of the row
						if (lastsubposstart == i+1) { //if at end of row, skip to next row
							i++;
						} else { //misformed something - abandon treating as a matrix
							matrix = false;
						}
					}
				}

				pos.push(len);
				var lastmxsubcnt = -1;
				if (mxnestingd==0 && pos.length>0 && matrix) {
					for (i=0;i<pos.length-1;i++) {
						if (i>0) mxout += '\\\\';
						if (i==0) {
							//var subarr = newFrag.substr(pos[i]+7,pos[i+1]-pos[i]-15).split(',');
							if (subpos[pos[i]].length==1) {
								var subarr = [newFrag.substr(pos[i]+7,pos[i+1]-pos[i]-15)];
							} else {
								var subarr = [newFrag.substring(pos[i]+7,subpos[pos[i]][1])];
								for (var j=2;j<subpos[pos[i]].length;j++) {
									subarr.push(newFrag.substring(subpos[pos[i]][j-1]+1,subpos[pos[i]][j]));
								}
								subarr.push(newFrag.substring(subpos[pos[i]][subpos[pos[i]].length-1]+1,pos[i+1]-8));
							}
						} else {
							//var subarr = newFrag.substr(pos[i]+8,pos[i+1]-pos[i]-16).split(',');
							if (subpos[pos[i]].length==1) {
								var subarr = [newFrag.substr(pos[i]+8,pos[i+1]-pos[i]-16)];
							} else {
								var subarr = [newFrag.substring(pos[i]+8,subpos[pos[i]][1])];
								for (var j=2;j<subpos[pos[i]].length;j++) {
									subarr.push(newFrag.substring(subpos[pos[i]][j-1]+1,subpos[pos[i]][j]));
								}
								subarr.push(newFrag.substring(subpos[pos[i]][subpos[pos[i]].length-1]+1,pos[i+1]-8));
							}
						}
						for (j=subarr.length-1;j>=0;j--) {
							if (subarr[j]=="{\\mid}") {
								if (i==0) {
									columnaligns = "|"+columnaligns;
								}
								subarr.splice(j,1);
							} else if (i==0) {
								columnaligns = "c"+columnaligns;
							}
						}
						if (lastmxsubcnt>0 && subarr.length!=lastmxsubcnt) {
							matrix = false;
						} else if (lastmxsubcnt==-1) {
							lastmxsubcnt=subarr.length;
						}
						mxout += subarr.join('&');
					}
				}
				mxout = "\\begin{array}{"+columnaligns+"} "+mxout+"\\end{array}";

				if (matrix) { newFrag = mxout;}
			}
		}
	}

    str = AMremoveCharsAndBlanks(str,symbol.input.length);
    if (typeof symbol.invisible != "boolean" || !symbol.invisible) {
      node = '\\right'+AMTgetTeXsymbol(symbol); //AMcreateMmlNode("mo",document.createTextNode(symbol.output));
      newFrag += node;
      addedright = true;
    } else {
	    newFrag += '\\right.';
	    addedright = true;
    }

  }
  if(AMnestingDepth>0 && !addedright) {
	  newFrag += '\\right.'; //adjust for non-matching left brackets
	  //todo: adjust for non-matching right brackets
  }

  return [newFrag,str];
}