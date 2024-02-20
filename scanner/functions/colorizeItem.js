function colorizeItem(item, visible) {
			var legendItem = item.legendItem,
				legendLine = item.legendLine,
				legendSymbol = item.legendSymbol,
				hiddenColor = itemHiddenStyle.color,
				textColor = visible ? options.itemStyle.color : hiddenColor,
				symbolColor = visible ? item.color : hiddenColor;

			if (legendItem) {
				legendItem.css({ fill: textColor });
			}
			if (legendLine) {
				legendLine.attr({ stroke: symbolColor });
			}
			if (legendSymbol) {
				legendSymbol.attr({
					stroke: symbolColor,
					fill: symbolColor
				});
			}
		}