function ensureValuePrecision(val, props) {
	  var step = props.step;

	  var closestPoint = getClosestPoint(val, props);
	  return step === null ? closestPoint : parseFloat(closestPoint.toFixed(getPrecision(step)));
	}