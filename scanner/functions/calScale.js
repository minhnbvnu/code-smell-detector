function calScale(pstart, pmove) {
		if (pstart.length >= 2 && pmove.length >= 2) {
			var disStart = getDistance(pstart[1], pstart[0]);
			var disEnd = getDistance(pmove[1], pmove[0]);

			return disEnd / disStart;
		}
		return 1;
	}