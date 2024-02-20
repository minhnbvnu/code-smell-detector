function reference (value) {
	var fiber = Schedule.peek()
	var element = fiber.owner
	var index = ++fiber.index
	var children = element.children

	return index !== children.length ? children[index] : children[index] = {current: Lifecycle.resolve(element, value)}
}