function propsHook(props, context) {
	if (!props) return;

	// React annoyingly special-cases single children, and some react components are ridiculously strict about this.
	let c = props.children;
	if (
		c &&
		Array.isArray(c) &&
		c.length === 1 &&
		(typeof c[0] === 'string' || typeof c[0] === 'function' || c[0] instanceof VNode)
	) {
		props.children = c[0];

		// but its totally still going to be an Array.
		if (props.children && typeof props.children === 'object') {
			props.children.length = 1;
			props.children[0] = props.children;
		}
	}

	// add proptype checking
	if (DEV) {
		let ctor = typeof this === 'function' ? this : this.constructor,
			propTypes = this.propTypes || ctor.propTypes;
		const displayName = this.displayName || ctor.name;

		if (propTypes) {
			PropTypes.checkPropTypes(propTypes, props, 'prop', displayName);
		}
	}
}