function softsign(x) {
	  return tidy(function () {
	    return div(x, abs$8(x).add(1));
	  });
	}