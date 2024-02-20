function pushDownOverride(node, override) {
			if (Strings.empty(override) || !Strings.empty(Dom.getStyle(node, styleName))) {
				return;
			}
			overrideWrapper = setStyle(node, styleName, override, overrideWrapper);
		}