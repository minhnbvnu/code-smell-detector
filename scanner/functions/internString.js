function internString(str) {
	  var obj = {};
	  obj[str] = true;
	  return Object.keys(obj)[0];
	}