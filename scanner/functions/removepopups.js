function removepopups() {
			array_foreach(popups, function(popup) {
				var els = popup.querySelectorAll("img, video, audio");
				for (var i = 0; i < els.length; i++) {
					if (els[i].tagName === "VIDEO" || els[i].tagName === "AUDIO")
						els[i].pause();
					check_image_unref(els[i]);
				}
				if (popup.parentNode)
					popup.parentNode.removeChild(popup);
				var index = array_indexof(popups, popup);
				if (index > -1) {
					popups.splice(index, 1);
				}
			});
			if (removepopups_timer) {
				clearTimeout(removepopups_timer);
				removepopups_timer = null;
			}
		}