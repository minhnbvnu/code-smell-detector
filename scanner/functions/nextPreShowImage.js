function nextPreShowImage() {
	preshow_current += 1;
	if((preshow_current + 1) > preshow_imagesTotal) {
		preshow_current = 0;
	}

	$("#preso").empty();
	tmpImg = preshow_images.eq(preshow_current).clone();
	$(tmpImg).attr('width', '1020');
	$("#preso").html(tmpImg);
}