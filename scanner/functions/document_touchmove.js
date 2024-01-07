function document_touchmove(event) {
			var touch = event.touches[0];
			if (button !== document.elementFromPoint(touch.pageX, touch.pageY)) {
				// finger left the button
				clicked = false;
				button.onmouseleave();
			}
		}