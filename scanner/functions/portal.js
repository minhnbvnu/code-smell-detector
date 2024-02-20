function portal (value) {
	return new struct(Enum.portal, null, null, null, [target(value.children, value.target, value)])
}