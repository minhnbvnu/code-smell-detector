function collateMixins(mixins) {
	let keyed = {};
	for (let i = 0; i < mixins.length; i++) {
		let mixin = mixins[i];
		for (let key in mixin) {
			if (mixin.hasOwnProperty(key) && typeof mixin[key] === 'function') {
				(keyed[key] || (keyed[key] = [])).push(mixin[key]);
			}
		}
	}
	return keyed;
}