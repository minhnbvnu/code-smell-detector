function explodeViaTempVar(tempVar, childPath, ignoreChildResult) {
	    _assert2.default.ok(!ignoreChildResult || !tempVar, "Ignoring the result of a child expression but forcing it to " + "be assigned to a temporary variable?");

	    var result = self.explodeExpression(childPath, ignoreChildResult);

	    if (ignoreChildResult) {
	      // Side effects already emitted above.

	    } else if (tempVar || hasLeapingChildren && !t.isLiteral(result)) {
	      // If tempVar was provided, then the result will always be assigned
	      // to it, even if the result does not otherwise need to be assigned
	      // to a temporary variable.  When no tempVar is provided, we have
	      // the flexibility to decide whether a temporary variable is really
	      // necessary.  Unfortunately, in general, a temporary variable is
	      // required whenever any child contains a yield expression, since it
	      // is difficult to prove (at all, let alone efficiently) whether
	      // this result would evaluate to the same value before and after the
	      // yield (see #206).  One narrow case where we can prove it doesn't
	      // matter (and thus we do not need a temporary variable) is when the
	      // result in question is a Literal value.
	      result = self.emitAssign(tempVar || self.makeTempVar(), result);
	    }
	    return result;
	  }