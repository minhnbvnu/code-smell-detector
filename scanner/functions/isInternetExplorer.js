function isInternetExplorer() {
	    if (typeof navigator === 'undefined') {
	      return false;
	    }

	    var rv = -1; // Return value assumes failure.
	    var ua = navigator.userAgent;
	    if (navigator.appName === 'Microsoft Internet Explorer') {
	      var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
	      if (re.exec(ua) != null)
	        rv = parseFloat(RegExp.$1);
	    }
	    // IE > 11
	    else if (ua.indexOf("Trident") > -1) {
	      var re = new RegExp("rv:([0-9]{2,2}[\.0-9]{0,})");
	      if (re.exec(ua) !== null) {
	        rv = parseFloat(RegExp.$1);
	      }
	    }

	    return rv >= 8;
	  }