function on_zoom_etc() {
			// scale to nearest pixel-perfect size
			button.style.transform = `scale(${Math.max(1, Math.floor(devicePixelRatio)) / devicePixelRatio})`;
			button.style.transformOrigin = "bottom right";
			button.style.imageRendering = "pixelated";
		}