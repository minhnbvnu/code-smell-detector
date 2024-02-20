function breakpoint(position, demerits, ratio, line, fitnessClass, totals, previous) {
			return {
				position: position,
				demerits: demerits,
				ratio: ratio,
				line: line,
				fitnessClass: fitnessClass,
				totals: totals || {
					width: 0,
					stretch: 0,
					shrink: 0
				},
				previous: previous
			};
		}