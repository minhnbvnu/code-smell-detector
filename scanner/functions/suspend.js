function suspend (fiber, value, resolved, rejected) {
	if (fiber.async !== null) {
		return resolve(fiber, null, suspend, null, [fiber, value, resolved, rejected], true)
	} else {
		return resolve(fiber, value, resolved, rejected, null, false)
	}
}