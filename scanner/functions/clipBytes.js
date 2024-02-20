function clipBytes(uint8arr, limit) {
	let arr = Array.from(uint8arr)
	let [values, remaining] = sliceArray(arr, limit)
	let output = formatBytes(values)
	if (remaining > 0) output += `\n... and ${remaining} more`
	return output
}