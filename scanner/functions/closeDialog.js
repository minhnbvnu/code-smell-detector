function closeDialog(e) {
	// cleanup animation
	anim.removeEventListener('complete', handleAnimation);
	if (!OS_ANDROID) {
		$.progressFront.animate();
	}

	// close dialog
	$.dialog.close();
}