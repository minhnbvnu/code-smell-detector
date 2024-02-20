function firstRender() {
		// VML namespaces can't be added until after complete. Listening
		// for Perini's doScroll hack is not enough.
		var ONREADYSTATECHANGE = 'onreadystatechange',
		COMPLETE = 'complete';
		// Note: in spite of JSLint's complaints, win == win.top is required
		/*jslint eqeq: true*/
		if ((!hasSVG && (win == win.top && doc.readyState !== COMPLETE)) || (useCanVG && !win.canvg)) {
		/*jslint eqeq: false*/
			if (useCanVG) {
				// Delay rendering until canvg library is downloaded and ready
				CanVGController.push(firstRender, options.global.canvasToolsURL);
			} else {
				doc.attachEvent(ONREADYSTATECHANGE, function () {
					doc.detachEvent(ONREADYSTATECHANGE, firstRender);
					if (doc.readyState === COMPLETE) {
						firstRender();
					}
				});
			}
			return;
		}

		// create the container
		getContainer();

		// Run an early event after the container and renderer are established
		fireEvent(chart, 'init');

		// Initialize range selector for stock charts
		if (Highcharts.RangeSelector && options.rangeSelector.enabled) {
			chart.rangeSelector = new Highcharts.RangeSelector(chart);
		}

		resetMargins();
		setChartSize();

		// Set the common inversion and transformation for inverted series after initSeries
		setInverted();

		// get axes
		getAxes();

		// Initialize the series
		each(options.series || [], function (serieOptions) {
			initSeries(serieOptions);
		});

		// Run an event where series and axes can be added
		//fireEvent(chart, 'beforeRender');

		// Initialize scroller for stock charts
		if (Highcharts.Scroller && (options.navigator.enabled || options.scrollbar.enabled)) {
			chart.scroller = new Highcharts.Scroller(chart);
		}

		chart.render = render;

		// depends on inverted and on margins being set
		chart.tracker = tracker = new MouseTracker(options.tooltip);


		render();

		// add canvas
		renderer.draw();
		// run callbacks
		if (callback) {
			callback.apply(chart, [chart]);
		}
		each(chart.callbacks, function (fn) {
			fn.apply(chart, [chart]);
		});
		
		
		// If the chart was rendered outside the top container, put it back in
		if (renderToClone) {
			renderTo.appendChild(container);
			discardElement(renderToClone);
		}

		fireEvent(chart, 'load');

	}