function showResetZoom() {
		var lang = defaultOptions.lang,
			btnOptions = optionsChart.resetZoomButton,
			theme = btnOptions.theme,
			states = theme.states,
			box = btnOptions.relativeTo === 'chart' ? null : {
				x: plotLeft,
				y: plotTop,
				width: plotWidth,
				height: plotHeight
			};
		chart.resetZoomButton = renderer.button(lang.resetZoom, null, null, zoomOut, theme, states && states.hover)
			.attr({
				align: btnOptions.position.align,
				title: lang.resetZoomTitle
			})
			.add()
			.align(btnOptions.position, false, box);
	}