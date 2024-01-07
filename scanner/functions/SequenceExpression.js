function SequenceExpression() {
	  return this.get("expressions").pop().getTypeAnnotation();
	}