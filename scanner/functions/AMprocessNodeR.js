function AMprocessNodeR(n, linebreaks) {
  var mtch, str, arr, frg, i;
  if (n.childNodes.length == 0) {
   if ((n.nodeType!=8 || linebreaks) &&
    n.parentNode.nodeName!="form" && n.parentNode.nodeName!="FORM" &&
    n.parentNode.nodeName!="textarea" && n.parentNode.nodeName!="TEXTAREA" &&
    n.parentNode.nodeName!="pre" && n.parentNode.nodeName!="PRE") {
    str = n.nodeValue;
    if (!(str == null)) {
      str = str.replace(/\r\n\r\n/g,"\n\n");
      if (config.doubleblankmathdelimiter) {
        str = str.replace(/\x20\x20\./g," "+config.AMdelimiter1+".");
        str = str.replace(/\x20\x20,/g," "+config.AMdelimiter1+",");
        str = str.replace(/\x20\x20/g," "+config.AMdelimiter1+" ");
      }
      str = str.replace(/\x20+/g," ");
      str = str.replace(/\s*\r\n/g," ");
       mtch = false;
      if (config.AMusedelimiter2) {
      str = str.replace(new RegExp(config.AMescape2, "g"),
              function(st){mtch=true;return "AMescape2"});
      }
      str = str.replace(new RegExp(config.AMescape1, "g"),
              function(st){mtch=true;return "AMescape1"});
     if (config.AMusedelimiter2)  str = str.replace(new RegExp(config.AMdelimiter2regexp, "g"),config.AMdelimiter1);
      arr = str.split(config.AMdelimiter1);
      for (i=0; i<arr.length; i++)
      	if (config.AMusedelimiter2) {
		arr[i]=arr[i].replace(/AMescape2/g,config.AMdelimiter2).replace(/AMescape1/g,config.AMdelimiter1);
	} else {
		arr[i]=arr[i].replace(/AMescape1/g,config.AMdelimiter1);
	}
      if (arr.length>1 || mtch) {

      frg = AMstrarr2docFrag(arr,n.nodeType==8);
      var len = frg.childNodes.length;
      n.parentNode.replaceChild(frg,n);
      return len-1;

      }
    }
   } else return 0;
  } else if (n.nodeName!="math") { //should this change to img?
    for (i=0; i<n.childNodes.length; i++)
      i += AMprocessNodeR(n.childNodes[i], linebreaks);
  }
  return 0;
}