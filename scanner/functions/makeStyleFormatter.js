function makeStyleFormatter(styleName, styleValue, createWrapper, isStyleEq, isReusable, isPrunable, leftPoint, rightPoint) {

		function removeStyle(node, styleName) {
			if (Strings.empty(Dom.getStyle(node, styleName))) {
				return;
			}
			Dom.setStyle(node, styleName, null);
			if (isPrunable(node)) {
				removeShallowAdjust(node, leftPoint, rightPoint);
			}
		}

		function setStyle(node, styleName, styleValue, prevWrapper) {
			if (prevWrapper && prevWrapper === node.previousSibling) {
				insertAdjust(node, prevWrapper, true, leftPoint, rightPoint);
				removeStyle(node, styleName);
				return prevWrapper;
			}
			if (isReusable(node)) {
				Dom.setStyle(node, styleName, styleValue);
				return prevWrapper;
			}
			var wrapper = createWrapper();
			var editable = DomLegacy.getEditingHostOf(node);
			if (!editable || !ContentRules.isAllowed(editable, wrapper.nodeName)) {
				return null;
			}
			Dom.setStyle(wrapper, styleName, styleValue);
			wrapAdjust(node, wrapper, leftPoint, rightPoint);
			removeStyle(node, styleName);
			return wrapper;
		}

		function hasContext(node) {
			return isStyleEq(Dom.getStyle(node, styleName), styleValue);
		}

		function getOverride(node) {
			var override = Dom.getStyle(node, styleName);
			return (Strings.empty(override) || isStyleEq(override, styleValue)
					? null
					: override);
		}

		function clearOverride(node) {
			removeStyle(node, styleName);
		}

		function clearOverrideRec(node) {
			Dom.walkRec(node, clearOverride);
		}

		var overrideWrapper = null;
		function pushDownOverride(node, override) {
			if (Strings.empty(override) || !Strings.empty(Dom.getStyle(node, styleName))) {
				return;
			}
			overrideWrapper = setStyle(node, styleName, override, overrideWrapper);
		}

		var contextWrapper = null;
		function setContext(node) {
			Dom.walk(node.firstChild, clearOverrideRec);
			contextWrapper = setStyle(node, styleName, styleValue, contextWrapper);
		}

		return {
			hasContext: hasContext,
			getOverride: getOverride,
			clearOverride: clearOverride,
			pushDownOverride: pushDownOverride,
			setContext: setContext,
			isUpperBoundary: isUpperBoundary_default
		};
	}