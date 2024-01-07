function adjust_segments(segments, total_available_length) {
		segments.sort((a, b) => a.pos - b.pos);

		// Clamp
		for (const segment of segments) {
			segment.pos = Math.max(segment.pos, 0);
			segment.pos = Math.min(segment.pos, total_available_length - segment.length);
		}

		// Shove things downwards to prevent overlap
		for (let i = 1; i < segments.length; i++) {
			const segment = segments[i];
			const prev_segment = segments[i - 1];
			const overlap = prev_segment.pos + prev_segment.length - segment.pos;
			if (overlap > 0) {
				segment.pos += overlap;
			}
		}

		// Clamp
		for (const segment of segments) {
			segment.pos = Math.max(segment.pos, 0);
			segment.pos = Math.min(segment.pos, total_available_length - segment.length);
		}

		// Shove things upwards to get things back on screen
		for (let i = segments.length - 2; i >= 0; i--) {
			const segment = segments[i];
			const prev_segment = segments[i + 1];
			const overlap = segment.pos + segment.length - prev_segment.pos;
			if (overlap > 0) {
				segment.pos -= overlap;
			}
		}
	}