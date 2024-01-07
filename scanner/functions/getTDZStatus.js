function getTDZStatus(refPath, bindingPath) {
	  var executionStatus = bindingPath._guessExecutionStatusRelativeTo(refPath);

	  if (executionStatus === "before") {
	    return "inside";
	  } else if (executionStatus === "after") {
	    return "outside";
	  } else {
	    return "maybe";
	  }
	}