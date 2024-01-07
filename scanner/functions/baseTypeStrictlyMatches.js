function baseTypeStrictlyMatches(right) {
	  var left = this.getTypeAnnotation();
	  right = right.getTypeAnnotation();

	  if (!t.isAnyTypeAnnotation(left) && t.isFlowBaseAnnotation(left)) {
	    return right.type === left.type;
	  }
	}