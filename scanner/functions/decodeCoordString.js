function decodeCoordString(coord_string, place) {
	let coord_strings = coord_string.split(","),
	lat_lng = L.latLng(coord_strings);
	lat_lng.new_place = place;

	return lat_lng;
}