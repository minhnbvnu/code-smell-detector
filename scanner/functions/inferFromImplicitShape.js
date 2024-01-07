function inferFromImplicitShape(shape, size) {
	  var shapeProd = 1;
	  var implicitIdx = -1;

	  for (var i = 0; i < shape.length; ++i) {
	    if (shape[i] >= 0) {
	      shapeProd *= shape[i];
	    } else if (shape[i] === -1) {
	      if (implicitIdx !== -1) {
	        throw Error("Shapes can only have 1 implicit size. " + ("Found -1 at dim " + implicitIdx + " and dim " + i));
	      }

	      implicitIdx = i;
	    } else if (shape[i] < 0) {
	      throw Error("Shapes can not be < 0. Found " + shape[i] + " at dim " + i);
	    }
	  }

	  if (implicitIdx === -1) {
	    if (size > 0 && size !== shapeProd) {
	      throw Error("Size(" + size + ") must match the product of shape " + shape);
	    }

	    return shape;
	  }

	  if (shapeProd === 0) {
	    throw Error("Cannot infer the missing size in [" + shape + "] when " + "there are 0 elements");
	  }

	  if (size % shapeProd !== 0) {
	    throw Error("The implicit shape can't be a fractional number. " + ("Got " + size + " / " + shapeProd));
	  }

	  var newShape = shape.slice();
	  newShape[implicitIdx] = size / shapeProd;
	  return newShape;
	}