function handleElementVNode(vnode, a) {
	let shouldSanitize, attrs, i;
	if (a) {
		for (i in a) if ((shouldSanitize = CAMEL_PROPS.test(i))) break;
		if (shouldSanitize) {
			attrs = vnode.attributes = {};
			for (i in a) {
				if (a.hasOwnProperty(i)) {
					attrs[CAMEL_PROPS.test(i) ? i.replace(/([A-Z0-9])/, '-$1').toLowerCase() : i] = a[i];
				}
			}
		}
	}
}