function escapeArrayElement(value) {
	const strValue = value.toString();
	const escapedValue = strValue.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
	return `"${escapedValue}"`;
}