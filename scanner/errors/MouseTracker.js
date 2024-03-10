			var mouseMove = function (e) {

				// let the system handle multitouch operations like two finger scroll
				// and pinching
				if (e && e.touches && e.touches.length > 1) {
					return;
				}

				// normalize
				e = normalizeMouseEvent(e);
				if (!hasTouch) { // not for touch devices
					e.returnValue = false;
				}

				var chartX = e.chartX,
					chartY = e.chartY,
					isOutsidePlot = !isInsidePlot(chartX - plotLeft, chartY - plotTop);

				// on touch devices, only trigger click if a handler is defined
				if (hasTouch && e.type === 'touchstart') {
					if (attr(e.target, 'isTracker')) {
						if (!chart.runTrackerClick) {
							e.preventDefault();
						}
					} else if (!runChartClick && !isOutsidePlot) {
						e.preventDefault();
					}
				}

				// cancel on mouse outside
				if (isOutsidePlot) {

					/*if (!lastWasOutsidePlot) {
						// reset the tracker
						resetTracker();
					}*/

					// drop the selection if any and reset mouseIsDown and hasDragged
					//drop();
					if (chartX < plotLeft) {
						chartX = plotLeft;
					} else if (chartX > plotLeft + plotWidth) {
						chartX = plotLeft + plotWidth;
					}

					if (chartY < plotTop) {
						chartY = plotTop;
					} else if (chartY > plotTop + plotHeight) {
						chartY = plotTop + plotHeight;
					}

				}

				if (mouseIsDown && e.type !== 'touchstart') { // make selection

					// determine if the mouse has moved more than 10px
					hasDragged = Math.sqrt(
						Math.pow(mouseDownX - chartX, 2) +
						Math.pow(mouseDownY - chartY, 2)
					);
					if (hasDragged > 10) {
						var clickedInside = isInsidePlot(mouseDownX - plotLeft, mouseDownY - plotTop);

						// make a selection
						if (hasCartesianSeries && (zoomX || zoomY) && clickedInside) {
							if (!selectionMarker) {
								selectionMarker = renderer.rect(
									plotLeft,
									plotTop,
									zoomHor ? 1 : plotWidth,
									zoomVert ? 1 : plotHeight,
									0
								)
								.attr({
									fill: optionsChart.selectionMarkerFill || 'rgba(69,114,167,0.25)',
									zIndex: 7
								})
								.add();
							}
						}

						// adjust the width of the selection marker
						if (selectionMarker && zoomHor) {
							var xSize = chartX - mouseDownX;
							selectionMarker.attr({
								width: mathAbs(xSize),
								x: (xSize > 0 ? 0 : xSize) + mouseDownX
							});
						}
						// adjust the height of the selection marker
						if (selectionMarker && zoomVert) {
							var ySize = chartY - mouseDownY;
							selectionMarker.attr({
								height: mathAbs(ySize),
								y: (ySize > 0 ? 0 : ySize) + mouseDownY
							});
						}

						// panning
						if (clickedInside && !selectionMarker && optionsChart.panning) {
							chart.pan(chartX);
						}
					}

				} else if (!isOutsidePlot) {
					// show the tooltip
					onmousemove(e);
				}

				lastWasOutsidePlot = isOutsidePlot;

				// when outside plot, allow touch-drag by returning true
				return isOutsidePlot || !hasCartesianSeries;
			};