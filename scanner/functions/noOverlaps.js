function noOverlaps(reference_polygon_feature, polygon_feature_array) {
	for (feature_array_element of polygon_feature_array) {
		let overlap_exists = intersect(reference_polygon_feature, feature_array_element);
		if (overlap_exists) {
			return false;
		}
	}

	return true;
}