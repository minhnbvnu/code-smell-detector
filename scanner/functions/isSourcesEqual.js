function isSourcesEqual(source1, source2) {
		return source1 && source2 && getSourcePrimitive(source1) == getSourcePrimitive(source2);
	}