function findNextCombinedSlot(slots, start) {
	const slot = slots
		.filter(slot => slot.start >= start)
		.reduce((combined, slot) => {
			if (slot.start < combined.start) {
				// This slot starts too early
				return combined
			}

			if (slot.end <= combined.end) {
				// This slots starts and ends within the combined one
				return combined
			}

			if (slot.start > combined.end) {
				// This slots starts after the the combined one
				return combined
			}

			// The slot is extended
			return {
				start: combined.start,
				end: slot.end,
			}
		}, {
			start,
			end: start,
		})

	if (slot.start === slot.end) {
		// Empty -> no slot
		return undefined
	}

	return slot
}