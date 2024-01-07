function onFullscreenChange() {
		if (document.fullscreenElement !== bitmap_view_div && document.webkitFullscreenElement !== bitmap_view_div) {
			cleanup_bitmap_view();
		}
	}