function logKb(arg) {
	if (typeof arg === 'number')
		var l = arg
	else
		var l = arg.byteLength ? arg.byteLength : arg.length
	return (l / 1024).toFixed(1).toString().padStart(4, ' ') + ' kb ' + l
}