function applyMixins(proto, mixins) {
	for (let key in mixins)
		if (mixins.hasOwnProperty(key)) {
			proto[key] = multihook(
				mixins[key].concat(proto[key] || ARR),
				key === 'getDefaultProps' || key === 'getInitialState' || key === 'getChildContext'
			);
		}
}