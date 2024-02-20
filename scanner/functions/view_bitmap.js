function view_bitmap() {
	cleanup_bitmap_view();

	bitmap_view_div = document.createElement("div");
	bitmap_view_div.classList.add("bitmap-view", "inset-deep");
	document.body.appendChild(bitmap_view_div);
	$(bitmap_view_div).css({
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		position: "fixed",
		top: "0",
		left: "0",
		width: "100%",
		height: "100%",
		zIndex: "9999",
		background: "var(--Background)",
	});
	if (bitmap_view_div.requestFullscreen) { bitmap_view_div.requestFullscreen(); }
	else if (bitmap_view_div.webkitRequestFullscreen) { bitmap_view_div.webkitRequestFullscreen(); }

	let blob_url;
	let got_fullscreen = false;
	let iid = setInterval(() => {
		// In Chrome, if the page is already fullscreen, and you requestFullscreen,
		// hitting Esc will change document.fullscreenElement without triggering the fullscreenchange event!
		// It doesn't trigger a keydown either.
		if (document.fullscreenElement === bitmap_view_div) {
			got_fullscreen = true;
		} else if (got_fullscreen) {
			cleanup_bitmap_view();
		}
	}, 100);
	cleanup_bitmap_view = () => {
		document.removeEventListener("fullscreenchange", onFullscreenChange, { once: true });
		document.removeEventListener("webkitfullscreenchange", onFullscreenChange, { once: true });
		document.removeEventListener("keydown", onKeyDown);
		document.removeEventListener("mousedown", onMouseDown);
		// If you have e.g. the Help window open,
		// and right click to close the View Bitmap, with the mouse over the window,
		// this needs a delay to cancel the context menu.
		setTimeout(() => {
			document.removeEventListener("contextmenu", onContextMenu);
		}, 100);
		URL.revokeObjectURL(blob_url);
		clearInterval(iid);
		if (document.fullscreenElement === bitmap_view_div) {
			if (document.exitFullscreen) {
				document.exitFullscreen(); // avoid warning in Firefox
			} else if (document.msExitFullscreen) {
				document.msExitFullscreen();
			} else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			} else if (document.webkitExitFullscreen) {
				document.webkitExitFullscreen();
			}
		}
		bitmap_view_div.remove();
		cleanup_bitmap_view = () => { };
	};
	document.addEventListener("fullscreenchange", onFullscreenChange, { once: true });
	document.addEventListener("webkitfullscreenchange", onFullscreenChange, { once: true });
	document.addEventListener("keydown", onKeyDown);
	document.addEventListener("mousedown", onMouseDown);
	document.addEventListener("contextmenu", onContextMenu);

	function onFullscreenChange() {
		if (document.fullscreenElement !== bitmap_view_div) {
			cleanup_bitmap_view();
		}
	}
	let repeating_f = false;
	function onKeyDown(event) {
		// console.log(event.key, event.repeat);
		repeating_f = repeating_f || event.repeat && (event.key === "f" || event.key === "F");
		if (event.repeat) { return; }
		if (repeating_f && (event.key === "f" || event.key === "F")) {
			repeating_f = false;
			return; // Chrome sends an F keydown with repeat=false if you release Ctrl before F, while repeating.
			// This is a slightly overkill, and slightly overzealous workaround (can ignore one normal F before handling F as exit)
		}
		// Prevent also toggling View Bitmap on while toggling off, with Ctrl+F+F.
		// That is, if you hold Ctrl and press F twice, the second F should close View Bitmap and not reopen it immediately.
		// This relies on the keydown handler handling event.defaultPrevented (or isDefaultPrevented() if it's using jQuery)
		event.preventDefault();
		// Note: in mspaint, Esc is the only key that DOESN'T close the bitmap view,
		// but it also doesn't do anything else — other than changing the cursor. Stupid.
		cleanup_bitmap_view();
	}
	function onMouseDown(event) {
		// Note: in mspaint, only left click exits View Bitmap mode.
		// Right click can show a useless context menu.
		cleanup_bitmap_view();
	}
	function onContextMenu(event) {
		event.preventDefault();
		cleanup_bitmap_view(); // not needed
	}

	// @TODO: include selection in the bitmap
	// I believe mspaint uses a similar code path to the Thumbnail,
	// considering that if you right click on the image in View Bitmap mode,
	// it shows the silly "Thumbnail" context menu item.
	// (It also shows the selection, in a meaningless place, similar to the Thumbnail's bugs)
	main_canvas.toBlob(blob => {
		blob_url = URL.createObjectURL(blob);
		const img = document.createElement("img");
		img.src = blob_url;
		bitmap_view_div.appendChild(img);
	}, "image/png");
}