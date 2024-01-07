function parseUrl(url) {
	  var lastSlash = url.lastIndexOf('/');
	  var lastSearchParam = url.lastIndexOf('?');
	  var prefix = url.substring(0, lastSlash);
	  var suffix = lastSearchParam > lastSlash ? url.substring(lastSearchParam) : '';
	  return [prefix + '/', suffix];
	}