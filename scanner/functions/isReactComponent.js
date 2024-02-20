function isReactComponent(object) {
	return (
		(object.$$typeof &&
			object.$$typeof.toString() === 'Symbol(react.element)') ||
		(object.type && typeof object.type === 'function')
	);
}