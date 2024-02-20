function getClosestPoint(val, _ref2) {
	  var marks = _ref2.marks,
	      step = _ref2.step,
	      min = _ref2.min;

	  var points = Object.keys(marks).map(parseFloat);
	  if (step !== null) {
	    var closestStep = Math.round((val - min) / step) * step + min;
	    points.push(closestStep);
	  }
	  var diffs = points.map(function (point) {
	    return Math.abs(val - point);
	  });
	  return points[diffs.indexOf(Math.min.apply(Math, (0, _toConsumableArray3['default'])(diffs)))];
	}