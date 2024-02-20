function asyncParallelArray(arr, func, callback) {
	  var results = [];
	  var total = 0;
	  var arrLength = arr.length;

	  function count(errors) {
	    results.push.apply(results, errors);
	    total++;
	    if (total === arrLength) {
	      callback(results);
	    }
	  }

	  arr.forEach(function (a) {
	    func(a, count);
	  });
	}