function getShapeAs3D(shape) {
	  var shapeAs3D = [1, 1, 1];
	  var isScalar = shape.length === 0 || shape.length === 1 && shape[0] === 1;

	  if (!isScalar) {
	    shapeAs3D = [getBatchDim(shape)].concat(getRowsCols(shape));
	  }

	  return shapeAs3D;
	}