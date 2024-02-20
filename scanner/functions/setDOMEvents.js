function setDOMEvents() {
			var lastWasOutsidePlot = true;
			/*
			 * Record the starting position of a dragoperation
			 */
			container.onmousedown = function (e) {
				e = normalizeMouseEvent(e);

				// issue #295, dragging not always working in Firefox
				if (!hasTouch && e.preventDefault) {
					e.preventDefault();
				}

				// record the start position
				chart.mouseIsDown = mouseIsDown = true;
				chart.mouseDownX = mouseDownX = e.chartX;
				mouseDownY = e.chartY;

				addEvent(doc, hasTouch ? 'touchend' : 'mouseup', drop);
			};

			// The mousemove, touchmove and touchstart event handler
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

			/*
			 * When the mouse enters the container, run mouseMove
			 */
			container.onmousemove = mouseMove;

			/*
			 * When the mouse leaves the container, hide the tracking (tooltip).
			 */
			addEvent(container, 'mouseleave', hideTooltipOnMouseLeave);

			// issue #149 workaround
			// The mouseleave event above does not always fire. Whenever the mouse is moving
			// outside the plotarea, hide the tooltip
			addEvent(doc, 'mousemove', hideTooltipOnMouseMove);

			container.ontouchstart = function (e) {
				// For touch devices, use touchmove to zoom
				if (zoomX || zoomY) {
					container.onmousedown(e);
				}
				// Show tooltip and prevent the lower mouse pseudo event
				mouseMove(e);
			};

			/*
			 * Allow dragging the finger over the chart to read the values on touch
			 * devices
			 */
			container.ontouchmove = mouseMove;

			/*
			 * Allow dragging the finger over the chart to read the values on touch
			 * devices
			 */
			container.ontouchend = function () {
				if (hasDragged) {
					resetTracker();
				}
			};


			// MooTools 1.2.3 doesn't fire this in IE when using addEvent
			container.onclick = function (e) {
				var hoverPoint = chart.hoverPoint;
				e = normalizeMouseEvent(e);

				e.cancelBubble = true; // IE specific


				if (!hasDragged) {
					
					// Detect clicks on trackers or tracker groups, #783 
					if (hoverPoint && (attr(e.target, 'isTracker') || attr(e.target.parentNode, 'isTracker'))) {
						var plotX = hoverPoint.plotX,
							plotY = hoverPoint.plotY;

						// add page position info
						extend(hoverPoint, {
							pageX: chartPosition.left + plotLeft +
								(inverted ? plotWidth - plotY : plotX),
							pageY: chartPosition.top + plotTop +
								(inverted ? plotHeight - plotX : plotY)
						});

						// the series click event
						fireEvent(hoverPoint.series, 'click', extend(e, {
							point: hoverPoint
						}));

						// the point click event
						hoverPoint.firePointEvent('click', e);

					} else {
						extend(e, getMouseCoordinates(e));

						// fire a click event in the chart
						if (isInsidePlot(e.chartX - plotLeft, e.chartY - plotTop)) {
							fireEvent(chart, 'click', e);
						}
					}


				}
				// reset mouseIsDown and hasDragged
				hasDragged = false;
			};

		}