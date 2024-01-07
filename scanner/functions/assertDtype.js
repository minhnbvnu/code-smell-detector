function assertDtype(expectedDtype, actualDType, argName, functionName) {
	  if (expectedDtype === 'string_or_numeric') {
	    return;
	  }

	  if (expectedDtype == null) {
	    throw new Error("Expected dtype cannot be null.");
	  }

	  if (expectedDtype !== 'numeric' && expectedDtype !== actualDType || expectedDtype === 'numeric' && actualDType === 'string') {
	    throw new Error("Argument '" + argName + "' passed to '" + functionName + "' must " + ("be " + expectedDtype + " tensor, but got " + actualDType + " tensor"));
	  }
	}