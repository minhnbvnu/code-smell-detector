function evaluateTruthy() {
	  var res = this.evaluate();
	  if (res.confident) return !!res.value;
	}