function variance(array) {
	  var demeaned = sub(toArray1D(array), scalar(mean$2(array)));
	  var sumSquare = sum$1(mul(demeaned, demeaned)).dataSync()[0];
	  return sumSquare / array.length;
	}