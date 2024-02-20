function AMparseMath(str) {
 //DLMOD to remove &nbsp;, which editor adds on multiple spaces
  str = str.replace(/(&nbsp;|\u00a0|&#160;)/g,"");
  str = str.replace(/&gt;/g,">");
  str = str.replace(/&lt;/g,"<");
  if (str.match(/\S/)==null) {
	  return document.createTextNode(" ");
  }
  var texstring = AMTparseAMtoTeX(str);

  if (typeof mathbg != "undefined" && mathbg=='dark') {
	  texstring = "\\reverse " + texstring;
  }
  if (config.mathcolor!="") {
	  texstring = "\\"+config.mathcolor + texstring;
  }
  if (config.displaystyle) {
	  texstring = "\\displaystyle" + texstring;
  } else {
	  texstring = "\\textstyle" + texstring;
  }
  texstring = texstring.replace(/\$/g,'\\$');

  var node = document.createElement("img");
  if (typeof encodeURIComponent == "function") {
	  texstring = encodeURIComponent(texstring);
  } else {
	  texstring = escape(texstring);
  }
  node.src = AMTcgiloc + '?' + texstring;
  node.style.verticalAlign = "middle";
  if (config.showasciiformulaonhover)                      //fixed by djhsu so newline
    node.setAttribute("title",str.replace(/\s+/g," "));//does not show in Gecko

  var snode = document.createElement("span");
  snode.appendChild(node); //chg
  return snode;
}