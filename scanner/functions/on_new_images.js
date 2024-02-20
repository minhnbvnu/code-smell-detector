function on_new_images(images) {
			var highlight = get_single_setting("highlightimgs_auto");
			if (highlight === "always" || highlight === "hover")
				highlight_images({ images: images, hoveronly: highlight === "hover", is_auto: true });
			for (var i = 0; i < images.length; i++) {
				// apparently this isn't needed to ensure no duplicate event listeners?
				our_removeEventListener(images[i], "mouseover", image_mouseover);
				our_removeEventListener(images[i], "mouseout", image_mouseout);
				our_addEventListener(images[i], "mouseover", image_mouseover);
				our_addEventListener(images[i], "mouseout", image_mouseout);
			}
			if (settings.replaceimgs_auto)
				replace_images_full({ images: images, use_progressbar: false, use_elcache: true });
		}