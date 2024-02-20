function transformFunction(model) {
	var transform = model.toJSON();
	transform.item = '[' + transform.item + ']';
	return transform;
}