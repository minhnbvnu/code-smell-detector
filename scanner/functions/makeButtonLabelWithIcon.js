function makeButtonLabelWithIcon(props) {
		var label = makeButtonLabel(props);
		if (props.iconUrl) {
			label = makeButtonIconFromUrl(props.iconUrl) + label;
		}
		return label;
	}