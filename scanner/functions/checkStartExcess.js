function checkStartExcess(path) {
	let start_street = this.streets.getLayer(path[0].new_place.id),
	second_street_id = path[1].new_place.id,	
	start_second_intersections = start_street.intersections[second_street_id],
	second_is_intersection = typeof(start_second_intersections) === "undefined" ? false :
		start_second_intersections.some(intersection => 
		intersection[0].lat === path[1].lat && intersection[0].lng === path[1].lng),
	third_street_id = path[2].new_place.id,
	start_third_intersections = start_street.intersections[third_street_id],
	third_is_intersection = typeof(start_third_intersections) === "undefined" ? false :
		start_third_intersections.some(intersection =>
		intersection[0].lat === path[2].lat && intersection[0].lng === path[2].lng);

	if ((second_is_intersection || second_street_id === path[0].new_place.id) && 
		(third_is_intersection || third_street_id === path[0].new_place.id)) {
		if (path[2].distanceTo(path[0]) <
			path[2].distanceTo(path[1])) {
			path.splice(1, 1);
		}
	}
}