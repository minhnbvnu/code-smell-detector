function _dumpTransformData(selection, root) {
	console.clear();
	__dumpTransformData(selection.items);
	trace("***** Calculated values: *****");
	_calculateTransform(selection, root);
}