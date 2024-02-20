function normalizeMouseEvent(e) {
			var ePos,
				chartPosLeft,
				chartPosTop,
				chartX,
				chartY;

			// common IE normalizing
			e = e || win.event;
			if (!e.target) {
				e.target = e.srcElement;
			}

			// jQuery only copies over some properties. IE needs e.x and iOS needs touches.
			if (e.originalEvent) {
				e = e.originalEvent;
			}

			// The same for MooTools. It renames e.pageX to e.page.x. #445.
			if (e.event) {
				e = e.event;
			}

			// iOS
			ePos = e.touches ? e.touches.item(0) : e;

			// get mouse position
			chartPosition = offset(container);
			chartPosLeft = chartPosition.left;
			chartPosTop = chartPosition.top;

			// chartX and chartY
			if (isIE) { // IE including IE9 that has pageX but in a different meaning
				chartX = e.x;
				chartY = e.y;
			} else {
				chartX = ePos.pageX - chartPosLeft;
				chartY = ePos.pageY - chartPosTop;
			}

			return extend(e, {
				chartX: mathRound(chartX),
				chartY: mathRound(chartY)
			});
		}