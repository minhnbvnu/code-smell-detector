function setInverted() {
		var BAR = 'bar',
			isInverted = (
				inverted || // it is set before
				optionsChart.inverted ||
				optionsChart.type === BAR || // default series type
				optionsChart.defaultSeriesType === BAR // backwards compatible
			),
			seriesOptions = options.series,
			i = seriesOptions && seriesOptions.length;

		// check if a bar series is present in the config options
		while (!isInverted && i--) {
			if (seriesOptions[i].type === BAR) {
				isInverted = true;
			}
		}

		// set the chart property and the chart scope variable
		chart.inverted = inverted = isInverted;
	}