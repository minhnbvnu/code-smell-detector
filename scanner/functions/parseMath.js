function parseMath(str,latex) {
  var frag, node;
  AMnestingDepth = 0;
  //some basic cleanup for dealing with stuff editors like TinyMCE adds
  str = str.replace(/&nbsp;/g,"");
  str = str.replace(/&gt;/g,">");
  str = str.replace(/&lt;/g,"<");
  frag = AMparseExpr(str.replace(/^\s+/g,""),false)[0];
  node = createMmlNode("mstyle",frag);
  if (mathcolor != "") node.setAttribute("mathcolor",mathcolor);
  if (mathfontsize != "") {
	  node.setAttribute("fontsize", mathfontsize);
	  node.setAttribute("mathsize", mathfontsize);
  }
  if (mathfontfamily != "") {
	  node.setAttribute("fontfamily", mathfontfamily);
	  node.setAttribute("mathvariant", mathfontfamily);
  }

  if (displaystyle) node.setAttribute("displaystyle","true");
  node = createMmlNode("math",node);
  if (showasciiformulaonhover)                      //fixed by djhsu so newline
    node.setAttribute("title",str.replace(/\s+/g," "));//does not show in Gecko
  return node;
}