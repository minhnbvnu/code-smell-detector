function formatStyle(liveRange, styleName, styleValue, createWrapper, isStyleEq, isReusable, isPrunable) {
		createWrapper = createWrapper || createStyleWrapper_default;
		isStyleEq = isStyleEq || isStyleEq_default;
		isReusable = isReusable || isStyleWrapperReusable_default;
		isPrunable = isPrunable || isStyleWrapperPrunable_default;
		fixupRange(liveRange, function (range, leftPoint, rightPoint) {
			var formatter = makeStyleFormatter(
				styleName,
				styleValue,
				createWrapper,
				isStyleEq,
				isReusable,
				isPrunable,
				leftPoint,
				rightPoint
			);
			var reusableAncestor = findReusableAncestor(
				range,
				formatter.hasContext,
				formatter.getOverride,
				formatter.isUpperBoundary,
				isReusable
			);
			if (reusableAncestor) {
				formatter.setContext(reusableAncestor);
			} else {
				mutate(range, formatter, false);
			}
		});
	}