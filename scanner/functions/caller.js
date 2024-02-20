function caller (value, callback, children) {
	callback(value, counter(value, callback, children), children)
}