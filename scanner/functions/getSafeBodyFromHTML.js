function getSafeBodyFromHTML(html) {
	  var doc;
	  var root = null;
	  // Provides a safe context
	  if (!isOldIE && document.implementation && document.implementation.createHTMLDocument) {
	    doc = document.implementation.createHTMLDocument('foo');
	    !doc.documentElement ?  true ? invariant(false, 'Missing doc.documentElement') : invariant(false) : void 0;
	    doc.documentElement.innerHTML = html;
	    root = doc.getElementsByTagName('body')[0];
	  }
	  return root;
	}