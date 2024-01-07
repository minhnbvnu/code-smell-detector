function willIMaybeExecuteBefore(target) {
	  return this._guessExecutionStatusRelativeTo(target) !== "after";
	}