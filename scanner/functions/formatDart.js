function formatDart(str, nestInFunct) {
	// This method provides a clean interface to the generated code.
	let result, o=___scope.dart_style;
	if (nestInFunct) { str = `f(){ return ${delim}${str}${delim} }`; }
	try {
		// note that these two lines may need to be updated when the code below is regenerated, because the minified names may have changed.
		// search for "__teststring__" in the generated code to find the correct names.
		if (!formatter) { formatter = new o.U.ik(columns,0,o.P.z(o.Q.b5)); }
		result = formatter.oF(str);
		if (nestInFunct) { result = result.split(delim)[1].trim(); }
	} catch (e) {
		if (nestInFunct == null) {
			// Automatically re-execute with nestInFunct enabled.
			return formatDart(str, true);
		} else {
			throw(e);
		}
	}
	return result;
}