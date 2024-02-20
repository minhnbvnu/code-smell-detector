function initRange(positions){
		if (!hasRange){
			range.start = [positions.prev || 0,Editor.getCurrentTrack()];
			range.end = [positions.current,Editor.getCurrentTrack()];
			range.top = range.left = 100000;
			normalizeRange();
			hasRange = true;
			me.showSelectionUI();
			me.refresh();
		}else{
			range.end = [Tracker.getCurrentPatternPos(),Editor.getCurrentTrack()];
			normalizeRange();
			me.refresh();
		}
    }