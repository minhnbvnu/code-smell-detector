function computeCost(start, end, active, currentLine) {
			var width = sum.width - active.totals.width,
			stretch = 0,
			shrink = 0,
			// If the current line index is within the list of linelengths, use it, otherwise use
			// the last line length of the list.
			lineLength = currentLine < lineLengths.length ? lineLengths[currentLine - 1] : lineLengths[lineLengths.length - 1];

			if (nodes[end].type === 'penalty') {
				width += nodes[end].width;
			}

			if (width < lineLength) {
				// Calculate the stretch ratio
				stretch = sum.stretch - active.totals.stretch;

				if (stretch > 0) {
					return (lineLength - width) / stretch;
				} else {
					return linebreak.infinity;
				}

			} else if (width > lineLength) {
				// Calculate the shrink ratio
				shrink = sum.shrink - active.totals.shrink;

				if (shrink > 0) {
					return (lineLength - width) / shrink;
				} else {
					return linebreak.infinity;
				}
			} else {
				// perfect match
				return 0;
			}
		}