function getOverride(node) {
			var override = Dom.getStyle(node, styleName);
			return (Strings.empty(override) || isStyleEq(override, styleValue)
					? null
					: override);
		}