function apply_segments(component_area_el, pos_axis, segments) {
		// Since things aren't positioned absolutely, calculate space between
		let length_before = 0;
		for (const segment of segments) {
			segment.margin_before = segment.pos - length_before;
			length_before = segment.length + segment.pos;
		}

		// Apply to the DOM
		for (const segment of segments) {
			component_area_el.appendChild(segment.element);
			$(segment.element).css(`margin-${pos_axis}`, segment.margin_before);
		}
	}