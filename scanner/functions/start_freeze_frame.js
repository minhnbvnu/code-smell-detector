function start_freeze_frame() {
	if (freezing_display) {
		return; // don't update the frame
	}
	freezing_display = true;
	overlay_context.fillStyle = "black";
	overlay_context.fillRect(0, 0, canvas.width, canvas.height);
	overlay_context.drawImage(canvas, 0, 0);
}