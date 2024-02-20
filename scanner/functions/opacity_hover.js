function opacity_hover(el, targetel, action) {
					if (!targetel)
						targetel = el;
					our_addEventListener(el, "mouseover", function(e) {
						targetel.style.opacity = "1.0";
						if (action)
							targetel.style.boxShadow = "0px 0px 5px 1px white";
					}, true);
					our_addEventListener(el, "mouseout", function(e) {
						targetel.style.opacity = get_defaultopacity();
						if (action)
							targetel.style.boxShadow = "none";
					}, true);
				}