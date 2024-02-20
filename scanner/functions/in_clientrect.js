function in_clientrect(mouseX, mouseY, rect, border) {
			if (isNaN(border) || border === void 0)
				border = 0;
			if (mouseX >= (rect.left - border) && mouseX <= (rect.right + border) &&
				mouseY >= (rect.top - border) && mouseY <= (rect.bottom + border)) {
				return true;
			} else {
				return false;
			}
		}