function getInstIfValueChanged(targetInst, nativeEvent) {
	  var updated = inputValueTracking.updateValueIfChanged(targetInst);
	  var simulated = nativeEvent.simulated === true && ChangeEventPlugin._allowSimulatedPassThrough;
	
	  if (updated || simulated) {
	    return targetInst;
	  }
	}