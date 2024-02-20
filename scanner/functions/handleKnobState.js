function handleKnobState(knob,value){

		if (!filterChain) return;
		var label = knob.getLabel();
		filterChain.setState(label,value);
	}