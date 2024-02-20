function unformat(liveRange, nodeName) {
		fixupRange(liveRange, function (range, leftPoint, rightPoint) {
			mutate(range, makeNodeUnformatter(nodeName, leftPoint, rightPoint), true);
		});
	}