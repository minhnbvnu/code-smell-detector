function getIntersections(arr_a, arr_b, ids = []) {
	let intersections = [];

	for (let i = 0; i < arr_a.length; i++) {
		let el_a = arr_a[i];

		for (let j = 0; j < arr_b.length; j++) {
			let el_b = arr_b[j];
			
			if (isPointCoordinates(el_a) && isPointCoordinates(el_b)) {
				if (el_a[0] === el_b[0] && el_a[1] === el_b[1]) {
					let new_intersection;

					if (ids.length === 2) {
						let identified_intersections = {};
						identified_intersections[ids[0]] = i,
						identified_intersections[ids[1]] = j,
						new_intersection = [el_a, identified_intersections];
					}
					else {
						new_intersection = el_a;
					}
				
					intersections.push(new_intersection);
				}
			}
			else {
				throw new Error("Every element of each array must be a coordinate pair array.");
			}
		}
	}

	return intersections;
}