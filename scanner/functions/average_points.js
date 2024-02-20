function average_points(points) {
	const average = {x: 0, y: 0};
	for (const pointer of points) {
		average.x += pointer.x;
		average.y += pointer.y;
	}
	average.x /= points.length;
	average.y /= points.length;
	return average;
}