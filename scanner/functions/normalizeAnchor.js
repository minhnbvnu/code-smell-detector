function normalizeAnchor(props, init) {
	  var selectedValue = props.selectedValue || init && props.defaultSelectedValue;
	  var value = props.value || init && props.defaultValue;
	  var normalizedValue = value ? getValueFromSelectedValue(value) : getValueFromSelectedValue(selectedValue);
	  return !isEmptyArray(normalizedValue) ? normalizedValue : init && [(0, _moment2['default'])(), (0, _moment2['default'])().add(1, 'months')];
	}