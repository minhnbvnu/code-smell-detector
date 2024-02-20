function refs (element, value, instance) {
	if (element.owner !== null) {
		reference(element, element.stack, null)
		reference(element, element.stack = value, instance)
	}
}