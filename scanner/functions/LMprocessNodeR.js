function LMprocessNodeR(n, linebreaks) {
  var mtch, str, arr, frg, i;
  if (n.childNodes.length == 0) {
   if ((n.nodeType!=8 || linebreaks) &&
    n.parentNode.nodeName!="form" && n.parentNode.nodeName!="FORM" &&
    n.parentNode.nodeName!="textarea" && n.parentNode.nodeName!="TEXTAREA" &&
    n.parentNode.nodeName!="pre" && n.parentNode.nodeName!="PRE") {
    str = n.nodeValue;
    if (!(str == null)) {
      str = str.replace(/\r\n\r\n/g,"\n\n");
      str = str.replace(/\x20+/g," ");
      str = str.replace(/\s*\r\n/g," ");
// DELIMITERS:
      mtch = (str.indexOf("\$")==-1 ? false : true);
      str = str.replace(/([^\\])\$/g,"$1 \$");
      str = str.replace(/^\$/," \$");	// in case \$ at start of string
      arr = str.split(" \$");
      for (i=0; i<arr.length; i++)
	arr[i]=arr[i].replace(/\\\$/g,"\$");
      if (arr.length>1 || mtch) {
        if (checkForMathML) {
          checkForMathML = false;
          var nd = LMisMathMLavailable();
          LMnoMathML = nd != null;
          if (LMnoMathML && notifyIfNoMathML)
            if (alertIfNoMathML)
              alert("To view the ASCIIMathML notation use Internet Explorer 6 +\nMathPlayer (free from www.dessci.com)\n\
                or Firefox/Mozilla/Netscape");
            else LMbody.insertBefore(nd,LMbody.childNodes[0]);
        }
        if (!LMnoMathML) {
          frg = LMstrarr2docFrag(arr,n.nodeType==8);
          var len = frg.childNodes.length;
          n.parentNode.replaceChild(frg,n);
          return len-1;
        } else return 0;
      }
    }
   } else return 0;
  } else if (n.nodeName!="math") {
    for (i=0; i<n.childNodes.length; i++)
      i += LMprocessNodeR(n.childNodes[i], linebreaks);
  }
  return 0;
}