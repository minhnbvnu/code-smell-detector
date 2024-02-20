function stopPreShow() {
  try { presenterView.preshow_stop = null } catch (e) {}
	preshow_stop = null;

	$('#preshow').remove();
	$('#tips').remove();
	$('#preshow_timer').remove();

	loadSlides(loadSlidesBool);
}