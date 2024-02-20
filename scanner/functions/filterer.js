function filterer (value, callback, children) {
	if (execute(value, callback, children)) {
		pusher(value, callback, children)
	}
}