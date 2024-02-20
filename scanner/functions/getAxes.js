function getAxes() {
		var xAxisOptions = options.xAxis || {},
			yAxisOptions = options.yAxis || {},
			optionsArray,
			axis;

		// make sure the options are arrays and add some members
		xAxisOptions = splat(xAxisOptions);
		each(xAxisOptions, function (axis, i) {
			axis.index = i;
			axis.isX = true;
		});

		yAxisOptions = splat(yAxisOptions);
		each(yAxisOptions, function (axis, i) {
			axis.index = i;
		});

		// concatenate all axis options into one array
		optionsArray = xAxisOptions.concat(yAxisOptions);

		each(optionsArray, function (axisOptions) {
			axis = new Axis(axisOptions);
		});

		adjustTickAmounts();
	}