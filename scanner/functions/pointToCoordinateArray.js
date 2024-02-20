function pointToCoordinateArray(point) {
	let coordinate_array;

	if (typeof(point.lat) === "number" && typeof(point.lng) === "number") {
		coordinate_array = [point.lng, point.lat];
	}
	else if (point.geometry && point.geometry.coordinates && isPointCoordinates(point.geometry.coordinates)) {
		coordinate_array = point.geometry.coordinates;
	}
	else if (isPointCoordinates(point)) {
		coordinate_array = point;
	}
	else {
		throw new Error("Invalid point: point must either be array of 2 coordinates, or an L.latLng.");
	}

	return coordinate_array;
}