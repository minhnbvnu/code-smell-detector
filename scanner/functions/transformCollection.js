function transformCollection(model) {
	var o = model.toJSON();
	o.text = '### ' + o.text + ' ###';
	return o;
}