function toBeCloneOf(util) {
	return {
		compare(actual, expected, opts) {
			const { matches = {}, url = expected.props.path } = opts || {};
			const clonedRoute = cloneElement(expected, { url, matches, ...matches });
			const result = {};
			result.pass = util.equals(cleanVNode(actual), cleanVNode(clonedRoute));
			result.message = `Expected ${serialize(actual)} ${
				result.pass ? ' not' : ''
			}to equal ${serialize(clonedRoute)}`;
			return result;
		}
	};
}