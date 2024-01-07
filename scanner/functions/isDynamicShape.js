function isDynamicShape(node) {
	  return DYNAMIC_SHAPE_OPS.indexOf(node.op) >= 0;
	}