function getFlatIndexFrom3D(shape) {
	  var strides = computeStrides(shape).map(function (d) {
	    return d.toString();
	  });
	  return "\n  int getFlatIndex(ivec3 coords) {\n    return coords.x * " + strides[0] + " + coords.y * " + strides[1] + " + coords.z;\n  }\n";
	}