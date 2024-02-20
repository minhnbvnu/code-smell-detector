function getSizeAfterAdd() {
			text.add(wrapper);
			wrapper.attr({
				text: str, // alignment is available now
				x: x,
				y: y
			});

			if (box && defined(anchorX)) {
				wrapper.attr({
					anchorX: anchorX,
					anchorY: anchorY
				});
			}
		}