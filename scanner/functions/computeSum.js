function computeSum(breakPointIndex) {
			var result = {
					width: sum.width,
					stretch: sum.stretch,
					shrink: sum.shrink
				},
				i = 0;

			for (i = breakPointIndex; i < nodes.length; i += 1) {
				if (nodes[i].type === 'glue') {
					result.width += nodes[i].width;
					result.stretch += nodes[i].stretch;
					result.shrink += nodes[i].shrink;
				} else if (nodes[i].type === 'box' || (nodes[i].type === 'penalty' && nodes[i].penalty === -linebreak.infinity && i > breakPointIndex)) {
					break;
				}
			}
			return result;
		}