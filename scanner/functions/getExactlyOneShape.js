function getExactlyOneShape(shapes) {
	  if (Array.isArray(shapes) && Array.isArray(shapes[0])) {
	    if (shapes.length === 1) {
	      shapes = shapes;
	      return shapes[0];
	    } else {
	      throw new ValueError("Expected exactly 1 Shape; got " + shapes.length);
	    }
	  } else {
	    return shapes;
	  }
	}