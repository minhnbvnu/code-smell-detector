function getUTF8Bytes(string) {
	  var utf8codes = [];
	  for (var i = 0; i < string.length; i++) {
	    var code = string.charCodeAt(i);
	    var utf8 = unicodeFormat8(code);
	    for (var j = 0; j < utf8.length; j++) {
	      utf8codes.push(utf8[j]);
	    }
	  }
	  return utf8codes;
	}