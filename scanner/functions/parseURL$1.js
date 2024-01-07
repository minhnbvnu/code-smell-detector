function parseURL$1(url) {
	  if (url.indexOf(URL_SCHEME_SUFFIX) === -1) {
	    throw new Error("The url string provided does not contain a scheme. " + "Supported schemes are: " + ("" + ModelStoreManagerRegistry.getSchemes().join(',')));
	  }

	  return {
	    scheme: url.split(URL_SCHEME_SUFFIX)[0],
	    path: url.split(URL_SCHEME_SUFFIX)[1]
	  };
	}