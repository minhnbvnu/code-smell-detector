function resource (callback, value) {
	var fiber = Schedule.peek()
	var element = fiber.owner
	var index = ++fiber.index
	var children = element.children

	if (index === children.length) {
		children = children[index] = [value || [], callback]
	} else if (compare((children = children[index])[0], children[0] = value || [])) {
		return children[1][0]
	}

	Utility.throws(children[1] = Utility.resolve(callback(children[0], element.props), extract, null))
}