function renderLegend() {
			itemX = initialItemX;
			itemY = initialItemY;
			offsetWidth = 0;
			lastItemY = 0;

			if (!legendGroup) {
				legendGroup = renderer.g('legend')
					// #414, #759. Trackers will be drawn above the legend, but we have 
					// to sacrifice that because tooltips need to be above the legend
					// and trackers above tooltips
					.attr({ zIndex: 7 }) 
					.add();
			}


			// add each series or point
			allItems = [];
			each(series, function (serie) {
				var seriesOptions = serie.options;

				if (!seriesOptions.showInLegend) {
					return;
				}

				// use points or series for the legend item depending on legendType
				allItems = allItems.concat(
						serie.legendItems ||
						(seriesOptions.legendType === 'point' ?
								serie.data :
								serie)
				);

			});

			// sort by legendIndex
			stableSort(allItems, function (a, b) {
				return (a.options.legendIndex || 0) - (b.options.legendIndex || 0);
			});

			// reversed legend
			if (reversedLegend) {
				allItems.reverse();
			}

			// render the items
			each(allItems, renderItem);


			// Draw the border
			legendWidth = widthOption || offsetWidth;
			legendHeight = lastItemY - y + itemHeight;

			if (legendBorderWidth || legendBackgroundColor) {
				legendWidth += 2 * padding;
				legendHeight += 2 * padding;

				if (!box) {
					box = renderer.rect(
						0,
						0,
						legendWidth,
						legendHeight,
						options.borderRadius,
						legendBorderWidth || 0
					).attr({
						stroke: options.borderColor,
						'stroke-width': legendBorderWidth || 0,
						fill: legendBackgroundColor || NONE
					})
					.add(legendGroup)
					.shadow(options.shadow);
					box.isNew = true;

				} else if (legendWidth > 0 && legendHeight > 0) {
					box[box.isNew ? 'attr' : 'animate'](
						box.crisp(null, null, null, legendWidth, legendHeight)
					);
					box.isNew = false;
				}

				// hide the border if no items
				box[allItems.length ? 'show' : 'hide']();
			}
			
			// Now that the legend width and height are extablished, put the items in the 
			// final position
			each(allItems, positionItem);

			// 1.x compatibility: positioning based on style
			var props = ['left', 'right', 'top', 'bottom'],
				prop,
				i = 4;
			while (i--) {
				prop = props[i];
				if (style[prop] && style[prop] !== 'auto') {
					options[i < 2 ? 'align' : 'verticalAlign'] = prop;
					options[i < 2 ? 'x' : 'y'] = pInt(style[prop]) * (i % 2 ? -1 : 1);
				}
			}

			if (allItems.length) {
				legendGroup.align(extend(options, {
					width: legendWidth,
					height: legendHeight
				}), true, spacingBox);
			}

			if (!isResizing) {
				positionCheckboxes();
			}
		}