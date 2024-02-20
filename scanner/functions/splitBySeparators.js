function splitBySeparators(string, separators) {
	  var reg = new RegExp('[' + separators.join() + ']');
	  return string.split(reg).filter(function (token) {
	    return token;
	  });
	}