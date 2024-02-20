function typedArrayToJson() {
	let name = this.constructor.name
	let valueBytes = byteTable[name]
	let size = Math.min(this.length, BUFFER_LENGTH_LIMIT)
	let values = (new Array(size))
		.fill(0)
		.map((val, i) => this[i])
		.map(val => val.toString(16).padStart(valueBytes, '0'))
		.join(' ')
	if (size < this.length)
		return reviverWrap(`<${name} ${values} ... ${this.length - size} more>`)
	else
		return reviverWrap(`<${name} ${values}>`)
}