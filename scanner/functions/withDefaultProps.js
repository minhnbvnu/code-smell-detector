function withDefaultProps(props) {
	props = { ...props }

	for (const key in defaultProps) {
		if (props[key] === undefined) {
			props[key] = defaultProps[key]
		}
	}

	return props
}