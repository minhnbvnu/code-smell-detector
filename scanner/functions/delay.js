function delay(t) {
	return new Promise(f => setTimeout(f, t));
}