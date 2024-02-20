function doTransform(model) {
	var o = model.toJSON();
	if (o.subtitle) {
		if (o.image) {
			o.template = 'fullItem';
		} else {
			o.template = 'titleAndSub';
		}
	} else {
		o.template = 'title';
	}
	return o;
}