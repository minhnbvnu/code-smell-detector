function median(array) {
	  var arraySorted = array.slice().sort(function (a, b) {
	    return a - b;
	  });
	  var lowIdx = Math.floor((arraySorted.length - 1) / 2);
	  var highIdx = Math.ceil((arraySorted.length - 1) / 2);

	  if (lowIdx === highIdx) {
	    return arraySorted[lowIdx];
	  }

	  return (arraySorted[lowIdx] + arraySorted[highIdx]) / 2;
	}