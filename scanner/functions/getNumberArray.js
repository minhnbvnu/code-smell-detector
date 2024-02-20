function getNumberArray(num) {
	    return num ? num.toString().split('').reverse().map(function (i) {
	        return Number(i);
	    }) : [];
	}