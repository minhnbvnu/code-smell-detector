function segCmp(a, b) {
	return (b.msLength - a.msLength) * 100 + (a.event.start - b.event.start);
}