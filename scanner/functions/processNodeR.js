function processNodeR(n, linebreaks,latex) {
  var mtch, str, arr, frg, i;
  if (n.childNodes.length == 0) {
   if ((n.nodeType!=8 || linebreaks) &&
    n.parentNode.nodeName!="form" && n.parentNode.nodeName!="FORM" &&
    n.parentNode.nodeName!="textarea" && n.parentNode.nodeName!="TEXTAREA" /*&&
    n.parentNode.nodeName!="pre" && n.parentNode.nodeName!="PRE"*/) {
    str = n.nodeValue;
    if (!(str == null)) {
      str = str.replace(/\r\n\r\n/g,"\n\n");
      str = str.replace(/\x20+/g," ");
      str = str.replace(/\s*\r\n/g," ");
      if(latex) {
// DELIMITERS:
        mtch = (str.indexOf("\$")==-1 ? false : true);
        str = str.replace(/([^\\])\$/g,"$1 \$");
        str = str.replace(/^\$/," \$");	// in case \$ at start of string
        arr = str.split(" \$");
        for (i=0; i<arr.length; i++)
	  arr[i]=arr[i].replace(/\\\$/g,"\$");
      } else {
      mtch = false;
      str = str.replace(new RegExp(AMescape1, "g"),
              function(){mtch = true; return "AMescape1"});
      str = str.replace(/\\?end{?a?math}?/i,
              function(){automathrecognize = false; mtch = true; return ""});
      str = str.replace(/amath\b|\\begin{a?math}/i,
              function(){automathrecognize = true; mtch = true; return ""});
      arr = str.split(AMdelimiter1);
      if (automathrecognize)
        for (i=0; i<arr.length; i++)
          if (i%2==0) arr[i] = AMautomathrec(arr[i]);
      str = arr.join(AMdelimiter1);
      arr = str.split(AMdelimiter1);
      for (i=0; i<arr.length; i++) // this is a problem ************
        arr[i]=arr[i].replace(/AMescape1/g,AMdelimiter1);
      }
      if (arr.length>1 || mtch) {
        if (!noMathML) {
          frg = strarr2docFrag(arr,n.nodeType==8,latex);
          var len = frg.childNodes.length;
          n.parentNode.replaceChild(frg,n);
          return len-1;
        } else return 0;
      }
    }
   } else return 0;
  } else if (n.nodeName!="math") {
    for (i=0; i<n.childNodes.length; i++)
      i += processNodeR(n.childNodes[i], linebreaks,latex);
  }
  return 0;
}