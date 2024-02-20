function update_progress_el(el, percent, remove_on_complete) {
			var bar = el.children[0];
			if (typeof percent === "number") {
				if (bar.getAttribute("data-timer")) {
					clearInterval(parseInt(bar.getAttribute("data-timer")));
					bar.removeAttribute("data-timer");
				}
				if (percent >= 1 && remove_on_complete && el.parentElement) {
					el.parentElement.removeChild(el);
				} else {
					bar.style.width = (percent * 100) + "%";
				}
			} else if (percent == "unknown") {
				bar.style.width = "10%";
				if (!bar.getAttribute("data-timer")) {
					bar.style.left = "0%";
					bar.setAttribute("data-dir", "right");
					var timer = setInterval(function() {
						var left = parseFloat(bar.style.left);
						var delta = (15 / 1000) * 1;
						var size = 90;
						if (bar.getAttribute("data-dir") == "right") {
							left += (delta * size);
							if (left >= size) {
								left = size - (left - size);
								bar.setAttribute("data-dir", "left");
							}
						} else {
							left -= (delta * size);
							if (left <= 0) {
								left = -left;
								bar.setAttribute("data-dir", "right");
							}
						}
						bar.style.left = left + "%";
					}, 15);
					bar.setAttribute("data-timer", timer);
				}
			}
		}