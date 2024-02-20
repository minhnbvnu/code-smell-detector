function positionCheckboxes() {
			each(allItems, function (item) {
				var checkbox = item.checkbox,
					alignAttr = legendGroup.alignAttr;
				if (checkbox) {
					css(checkbox, {
						left: (alignAttr.translateX + item.legendItemWidth + checkbox.x - 40) + PX,
						top: (alignAttr.translateY + checkbox.y - 11) + PX
					});
				}
			});
		}