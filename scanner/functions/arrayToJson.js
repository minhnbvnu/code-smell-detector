function arrayToJson() {
	let primitives = this.filter(isPrimitive)
	if (primitives.length === this.length)
		return reviverWrap(`[${this.join(', ')}]`)
	else
		return this
}