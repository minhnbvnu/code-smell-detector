function setupSlideParamsCheck() {
	var check = function() {
		var currentSlide = currentSlideFromParams();
		if (!isNaN(currentSlide) && slidenum != currentSlide) {
			slidenum = currentSlide;
			showSlide();
		}
		setTimeout(check, 100);
	}
	setTimeout(check, 100);
}