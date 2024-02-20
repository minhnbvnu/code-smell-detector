function removePlotBandOrLine(id) {
			var i = plotLinesAndBands.length;
			while (i--) {
				if (plotLinesAndBands[i].id === id) {
					plotLinesAndBands[i].destroy();
				}
			}
		}