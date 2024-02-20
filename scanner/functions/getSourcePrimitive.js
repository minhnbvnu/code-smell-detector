function getSourcePrimitive(source) {
		return ((typeof source == 'object') ? (source.events || source.url) : '') || source;
	}