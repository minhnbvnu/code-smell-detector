function bindTouch() {

		function setPos(e) {

			var epos;

			// TODO: handle multitouch
			if (e.type === "touchend") {
				epos = e.changedTouches ? e.changedTouches[0] : e;
			} else {
				epos = e.touches ? e.touches[0] : e;
			}

			var relX = epos.clientX - el.offsetLeft,
				relY = epos.clientY - el.offsetTop;

			touch.diff = {
				x: touch.x - relX,
				y: touch.y - relY
			};
			touch.prev = {
				x: touch.x,
				y: touch.y
			};
			touch.x = relX;
			touch.y = relY;
		}

		document.addEventListener('touchstart', function (e) {
			setPos(e);
			keyed(input.KEYS.touch, true);
		}, false);
		document.addEventListener('touchmove', function (e) {
			e.preventDefault();
			setPos(e);
			keyed(input.KEYS.touchMove, true);
		}, false);
		document.addEventListener('touchend', function (e) {
			setPos(e);
			keyed(input.KEYS.touch, false);
			keyed(input.KEYS.touchMove, false);
		}, false);
	}