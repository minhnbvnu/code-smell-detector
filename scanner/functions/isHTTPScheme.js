function isHTTPScheme(url) {
	  return url.match(HTTPRequest.URL_SCHEME_REGEX) != null;
	}