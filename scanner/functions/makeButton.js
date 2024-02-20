function makeButton(button, props, hasMenu) {
		button.button({
			label: makeButtonLabel(props),
			text: !!(props.text || props.html),
			icons: {
				primary: props.icon || (props.iconUrl && 'aloha-ui-inline-icon-container') || null,
				secondary: (hasMenu && 'aloha-jqueryui-icon ui-icon-triangle-1-s') || null
			}
		});
		if (props.iconUrl) {
			button.button('widget')
				.children('.ui-button-icon-primary')
				.append(makeButtonIconFromUrl(props.iconUrl));
		}
		return button;
	}