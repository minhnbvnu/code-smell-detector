function checkEndExcess(path) {
	let goal_street = this.streets.getLayer(path[path.length - 1].new_place.id),
	second_to_last_street_id = path[path.length - 2].new_place.id,
	goal_second_to_last_intersections = goal_street.intersections[second_to_last_street_id],
	second_to_last_is_intersection = typeof(goal_second_to_last_intersections) === "undefined" ? false :
		goal_second_to_last_intersections.some(intersection => 
		intersection[0].lat === path[path.length - 1].lat && intersection[0].lng === path[path.length - 1].lng),
	third_last_street_id = path[path.length - 3].new_place.id,
	goal_third_last_intersections = goal_street.intersections[third_last_street_id],
	third_last_is_intersection = typeof(goal_third_last_intersections) === "undefined" ? false :
		goal_third_last_intersections.some(intersection =>
		intersection[0].lat === path[path.length - 3].lat && intersection[0].lng === path[path.length - 3].lng);

	if ((second_to_last_is_intersection || second_to_last_street_id === path[path.length - 1].new_place.id) &&
		(third_last_is_intersection || third_last_street_id === path[path.length - 1].new_place.id) && 
		path.length >= 3) {
		if (path[path.length - 3].distanceTo(path[path.length - 1]) <
			path[path.length - 3].distanceTo(path[path.length - 2])) {
			path.splice(path.length - 2, 1);
		}
	}
}