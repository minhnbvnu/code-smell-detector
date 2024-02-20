function toggle_thumbnail() {
	show_thumbnail = !show_thumbnail;
	if (!show_thumbnail) {
		$thumbnail_window.hide();
	} else {
		if (!thumbnail_canvas) {
			thumbnail_canvas = make_canvas(108, 92);
			thumbnail_canvas.style.width = "100%";
			thumbnail_canvas.style.height = "100%";
		}
		if (!$thumbnail_window) {
			$thumbnail_window = new $Window({
				title: localize("Thumbnail"),
				toolWindow: true,
				resizable: true,
				innerWidth: thumbnail_canvas.width + 4, // @TODO: should the border of $content be included in the definition of innerWidth/Height?
				innerHeight: thumbnail_canvas.height + 4,
				minInnerWidth: 52 + 4,
				minInnerHeight: 36 + 4,
				minOuterWidth: 0, // @FIXME: this shouldn't be needed
				minOuterHeight: 0, // @FIXME: this shouldn't be needed
			});
			$thumbnail_window.addClass("thumbnail-window");
			$thumbnail_window.$content.append(thumbnail_canvas);
			$thumbnail_window.$content.addClass("inset-deep");
			$thumbnail_window.$content.css({ marginTop: "1px" }); // @TODO: should this (or equivalent on titlebar) be for all windows?
			$thumbnail_window.maximize = () => { }; // @TODO: disable maximize with an option
			new ResizeObserver((entries) => {
				const entry = entries[0];
				if ("devicePixelContentBoxSize" in entry) {
					// console.log("devicePixelContentBoxSize", entry.devicePixelContentBoxSize);
					// Firefox seems to support this, although I can't find any documentation that says it should
					// I can't find an implementation bug or anything.
					// So I had to disable this case to test the fallback case (in Firefox 94.0)
					thumbnail_canvas.width = entry.devicePixelContentBoxSize[0].inlineSize;
					thumbnail_canvas.height = entry.devicePixelContentBoxSize[0].blockSize;
				} else {
					// console.log("contentBoxSize", entry.contentBoxSize);
					// round() seems to line up with what Firefox does for device pixel alignment, which is great.
					// In Chrome it's blurry at some zoom levels with round(), ceil(), or floor(), but it (documentedly) supports devicePixelContentBoxSize.
					thumbnail_canvas.width = Math.round(entry.contentBoxSize[0].inlineSize * devicePixelRatio);
					thumbnail_canvas.height = Math.round(entry.contentBoxSize[0].blockSize * devicePixelRatio);
				}
				update_helper_layer_immediately(); // updates thumbnail (but also unnecessarily the helper layer)
			}).observe(thumbnail_canvas, { box: ['device-pixel-content-box'] }); // @TODO: does the box make it worse browser support?
		}
		$thumbnail_window.show();
	}
	// Currently the thumbnail updates with the helper layer. But it's not part of the helper layer, so this is a bit of a misnomer for now.
	update_helper_layer();
}