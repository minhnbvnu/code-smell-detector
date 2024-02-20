function doEvent(eventList, frame) {
	if (eventList[frame] && !eventList[frame].activated) {
		eventList[frame].activated = true;
		eventList[frame].run();
	}
}