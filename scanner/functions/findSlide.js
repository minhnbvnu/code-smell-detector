function findSlide(hash) {
	var target = document.getElementById(hash);
	if (target) {
		for (var i = 0; i < slideIDs.length; i++) {
			if (target.id == slideIDs[i]) return i;
		}
	}
	return null;
}