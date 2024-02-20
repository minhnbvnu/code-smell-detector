function createStringRefProxy(name, component) {
	return (
		component._refProxies[name] ||
		(component._refProxies[name] = resolved => {
			if (component && component.refs) {
				component.refs[name] = resolved;
				if (resolved === null) {
					delete component._refProxies[name];
					component = null;
				}
			}
		})
	);
}