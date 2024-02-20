function _calculateAggregateViewBox(nodes) {
	let minX = Number.MAX_VALUE;
	let minY = Number.MAX_VALUE;
	let maxX = -Number.MAX_VALUE;
	let maxY = -Number.MAX_VALUE;

	for (let o of nodes) {
		let boundsR = o.boundsInParent.x + o.boundsInParent.width;
		let boundsB = o.boundsInParent.y + o.boundsInParent.height;
		if (o.boundsInParent.x < minX) { minX = o.boundsInParent.x; }
		if (o.boundsInParent.y < minY) { minY = o.boundsInParent.y; }
		if (boundsR > maxX) { maxX = boundsR; }
		if (boundsB > maxY) { maxY = boundsB; }
	}

	return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
}