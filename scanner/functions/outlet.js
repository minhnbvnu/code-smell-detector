async function outlet(...args){
	const id = uniqid()
	const promise = new Promise(done => pendingMessages[id] = done)
	await max.outlet(['to-js', ...args, id])
	return await promise
}