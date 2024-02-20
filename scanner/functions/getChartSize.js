function getChartSize() {

		containerWidth = (renderToClone || renderTo).offsetWidth;
		containerHeight = (renderToClone || renderTo).offsetHeight;
		chart.chartWidth = chartWidth = optionsChart.width || containerWidth || 600;
		chart.chartHeight = chartHeight = optionsChart.height ||
			// the offsetHeight of an empty container is 0 in standard browsers, but 19 in IE7:
			(containerHeight > 19 ? containerHeight : 400);
	}