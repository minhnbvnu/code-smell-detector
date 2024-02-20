function fixIeStaticMethodSubclassing() {
	let searched = 'if (superClass) _setPrototypeOf'
	let injection = `
	var builtins = ['prototype', '__proto__', 'caller', 'arguments', 'length', 'name']
	Object.getOwnPropertyNames(superClass).forEach(function(key) {
		if (builtins.indexOf(key) !== -1) return
		if (subClass[key] !== superClass[key]) subClass[key] = superClass[key]
	})`
	let replacement = injection + '\n' + searched
	return {
		renderChunk(code) {
			return code.replace(searched, replacement)
		}
	}
}