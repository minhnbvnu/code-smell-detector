function AMTremoveBrackets(node) {

  var st;
  if (node.charAt(0)=='{' && node.charAt(node.length-1)=='}') {
    var leftchop = 0;

    st = node.substr(1,5);
    if (st=='\\left') {
    	    st = node.charAt(6);
    	    if (st=="(" || st=="[" || st=="{") {
    	    	    leftchop = 7;
    	    } else {
    	    	    st = node.substr(6,7);
    	    	    if (st=='\\lbrace') {
    	    	    	    leftchop = 13;
    	    	    }
    	    }
    } else {
    	    st = node.charAt(1);
    	    if (st=="(" || st=="[") {
    	    	    leftchop = 2;
    	    }
    }
    if (leftchop>0) {
    	    //st = node.charAt(node.length-7);
    	    st = node.substr(node.length-8);
    	    if (st=="\\right)}" || st=="\\right]}" || st=='\\right.}') {
    	    	    node = '{'+node.substr(leftchop);
    	    	    node = node.substr(0,node.length-8)+'}';
    	    } else if (st=='\\rbrace}') {
    	    	    node = '{'+node.substr(leftchop);
    	    	    node = node.substr(0,node.length-14)+'}';
    	    }
    }
  }
  return node;
}