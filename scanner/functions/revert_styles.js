function revert_styles(el) {
			var oldstyle = el.getAttribute("data-imu-oldstyle");
			if (oldstyle) {
				el.setAttribute("style", oldstyle);
				el.removeAttribute("data-imu-oldstyle");
			} else if (el.getAttribute("style") && el.getAttribute("data-imu-newstyle")) {
				el.removeAttribute("style");
			}
			el.removeAttribute("data-imu-newstyle");
		}