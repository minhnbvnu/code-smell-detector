function GetTimestampEventName(events, pid) {
	var eventName = null;
	for (var i = 0; i < events.length; i++) {
		var event = events[i];
		if (event.pid === pid && event.name === 'BenchmarkInstrumentation::DisplayRenderingStats' || event.name === 'BenchmarkInstrumentation::MainThreadRenderingStats') {
			if (typeof event.args.data !== 'undefined' && event.args['data']['frame_count'] === 1) {
				if (eventName === event.name) {
					return event.name
				}
				eventName = event.name;
			}
		}
	}
	return 'BenchmarkInstrumentation::ImplThreadRenderingStats';
}