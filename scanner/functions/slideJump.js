function slideJump() {
	if (window.location.hash == null || window.location.hash == '') {
		currentSlide();
		return;
	}
	if (window.location.hash == null) return;
	var dest = null;
	dest = findSlide(window.location.hash.slice(1));
	if (dest == null) {
		dest = 0;
	}
	go(dest - snum);
}