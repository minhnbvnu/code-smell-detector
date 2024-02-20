function updateBoxSize() {
			var boxX,
				boxY,
				style = text.element.style;

			bBox = (width === undefined || height === undefined || wrapper.styles.textAlign) &&
				text.getBBox();
			wrapper.width = (width || bBox.width || 0) + 2 * padding + paddingLeft;
			wrapper.height = (height || bBox.height || 0) + 2 * padding;

			// update the label-scoped y offset
			baselineOffset = padding + renderer.fontMetrics(style && style.fontSize).b;

			if (needsBox) {

				// create the border box if it is not already present
				if (!box) {
					boxX = mathRound(-alignFactor * padding);
					boxY = baseline ? -baselineOffset : 0;

					wrapper.box = box = shape ?
						renderer.symbol(shape, boxX, boxY, wrapper.width, wrapper.height) :
						renderer.rect(boxX, boxY, wrapper.width, wrapper.height, 0, deferredAttr[STROKE_WIDTH]);
					box.add(wrapper);
				}

				// apply the box attributes
				if (!box.isImg) { // #1630
					box.attr(merge({
						width: wrapper.width,
						height: wrapper.height
					}, deferredAttr));
				}
				deferredAttr = null;
			}
		}