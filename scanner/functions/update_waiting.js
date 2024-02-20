function update_waiting() {
			if (!waitingel)
				return;
			var x = mouseX; //mouseAbsX;
			var y = mouseY; //mouseAbsY;
			waitingel.style.left = (x - (waitingsize / 2)) + "px";
			waitingel.style.top = (y - (waitingsize / 2)) + "px";
		}