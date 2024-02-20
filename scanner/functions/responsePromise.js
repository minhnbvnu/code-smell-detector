function responsePromise(obj, callback, errback) {
	return make(Promise.resolve(obj).then(callback, errback));
}