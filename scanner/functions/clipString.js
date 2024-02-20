function clipString(string, limit) {
	let arr = string.split('')
	let [values, remaining] = sliceArray(arr, limit)
	let output = values.join('')
	if (remaining > 0) output += `\n... and ${remaining} more`
	return output
}