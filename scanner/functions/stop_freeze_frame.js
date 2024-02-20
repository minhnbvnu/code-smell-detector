function stop_freeze_frame() {
	freezing_display = false;
	overlay_context.clearRect(0, 0, canvas.width, canvas.height);
}