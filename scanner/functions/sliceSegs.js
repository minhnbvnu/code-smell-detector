function sliceSegs(events, visEventEnds, start, end) {
	var segs = [],
		i, len=events.length, event,
		eventStart, eventEnd,
		segStart, segEnd,
		isStart, isEnd;
	for (i=0; i<len; i++) {
		event = events[i];
		eventStart = event.start;
		eventEnd = visEventEnds[i];
		if (eventEnd > start && eventStart < end) {
			if (eventStart < start) {
				segStart = cloneDate(start);
				isStart = false;
			}else{
				segStart = eventStart;
				isStart = true;
			}
			if (eventEnd > end) {
				segEnd = cloneDate(end);
				isEnd = false;
			}else{
				segEnd = eventEnd;
				isEnd = true;
			}
			segs.push({
				event: event,
				start: segStart,
				end: segEnd,
				isStart: isStart,
				isEnd: isEnd,
				msLength: segEnd - segStart
			});
		}
	}
	return segs.sort(segCmp);
}