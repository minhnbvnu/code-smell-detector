function isConditionalMapping(mapping) {
	return (
		mapping !== null && typeof mapping === "object" && !Array.isArray(mapping)
	);
}