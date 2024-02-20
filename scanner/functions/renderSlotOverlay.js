function renderSlotOverlay(overlayStart, overlayEnd) {
		var dayStart = cloneDate(t.visStart);
		var dayEnd = addDays(cloneDate(dayStart), 1);
		for (var i=0; i<colCnt; i++) {
			var stretchStart = new Date(Math.max(dayStart, overlayStart));
			var stretchEnd = new Date(Math.min(dayEnd, overlayEnd));
			if (stretchStart < stretchEnd) {
				var col = i*dis+dit;
				var rect = coordinateGrid.rect(0, col, 0, col, slotContent); // only use it for horizontal coords
				var top = timePosition(dayStart, stretchStart);
				var bottom = timePosition(dayStart, stretchEnd);
				rect.top = top;
				rect.height = bottom - top;
				slotBind(
					renderOverlay(rect, slotContent)
				);
			}
			addDays(dayStart, 1);
			addDays(dayEnd, 1);
		}
	}