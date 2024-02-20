function addPlotBandOrLine(options) {
			var obj = new PlotLineOrBand(options).render();
			plotLinesAndBands.push(obj);
			return obj;
		}