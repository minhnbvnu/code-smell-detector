function make_grinch_button() {
		const button = document.createElement("button");
		button.ariaLabel = "Disable seasonal theme";
		button.className = "grinch-button";
		let clicked = false;
		let smile = 0;
		let momentum = 0;
		let smile_target = 0;
		let anim_id;
		const num_frames = 38;
		const frame_width = 100;
		button.onclick = () => {
			if (smile === smile_target) {
				steal_christmas();
			}
			clicked = true;
		};
		button.onmouseleave = () => {
			smile_target = clicked ? 1 : 0;
			animate();
			document.removeEventListener('touchmove', document_touchmove);
		};
		button.onmouseenter = () => {
			smile_target = 1;
			momentum = Math.max(momentum, 0.02); // for the immediacy of the hover effect
			animate();
		};
		button.onpointerdown = (event) => {
			if (event.pointerType === "touch") {
				button.onmouseenter();
				document.addEventListener('touchmove', document_touchmove);
			}
		};
		// Not using pointerleave because it includes when the finger is lifted off the screen
		// Maybe it would be easier to detect that case with event.button(s) though.
		function document_touchmove(event) {
			var touch = event.touches[0];
			if (button !== document.elementFromPoint(touch.pageX, touch.pageY)) {
				// finger left the button
				clicked = false;
				button.onmouseleave();
			}
		}

		function animate() {
			cancelAnimationFrame(anim_id);
			smile += momentum * 0.5;
			momentum *= 0.9; // set to 0.99 to test smile getting stuck (should be fixed)
			if (smile_target) {
				momentum += 0.001;
			} else {
				if (smile < 0.4) {
					momentum -= 0.0005; // slowing down the last bit of un-smiling (feels more natural; I wish there were more frames though)
				} else {
					momentum -= 0.001;
				}
			}
			if (smile > 1) {
				smile = 1;
				momentum = 0;
				if (clicked) {
					steal_christmas();
				}
			} else if (smile < 0) {
				smile = 0;
				momentum = 0;
			}
			if (smile !== smile_target) {
				anim_id = requestAnimationFrame(animate);
			}
			button.style.backgroundPosition = `${-Math.floor(smile * (num_frames - 1)) * frame_width}px 0px`;
		}
		function on_zoom_etc() {
			// scale to nearest pixel-perfect size
			button.style.transform = `scale(${Math.max(1, Math.floor(devicePixelRatio)) / devicePixelRatio})`;
			button.style.transformOrigin = "bottom right";
			button.style.imageRendering = "pixelated";
		}
		window.addEventListener("resize", on_zoom_etc);
		on_zoom_etc();
		function steal_christmas() {
			let new_theme;
			try {
				localStorage[disable_seasonal_theme_key] = "true";
				new_theme = localStorage[theme_storage_key] || default_theme;
				// eslint-disable-next-line no-empty
			} catch (error) { }
			if (new_theme === "winter.css") {
				new_theme = default_theme;
			}
			set_theme(new_theme);
			button.remove();
			window.removeEventListener("resize", on_zoom_etc);
			document.removeEventListener('touchmove', document_touchmove);
		}
		document.body.appendChild(button);
		grinch_button = button;
	}