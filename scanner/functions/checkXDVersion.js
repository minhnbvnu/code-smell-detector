function checkXDVersion() {
	if (exports.xdVersionOk) { return true; }
	alert(
		`XD to Flutter plugin (v${exports.version}) requires Adobe XD version ` +
		`${exports.xdVersionRequired} or higher.` +
		`<br><br>Current version is ${app.version}. Please upgrade.`
	);
	return false;
}