function unsetColor(style, range) {
		setColor(
			style,
			range,
			Dom.getComputedStyle(getNearestEditingHost(range), isPluginSupportedStyle(style) ? style : getDefaultStyle())
		);
	}