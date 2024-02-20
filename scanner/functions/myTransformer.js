function myTransformer(model) {
	var transformed = model.toJSON();

	transformed.foo = transformed.foo + 'D';
	transformed.bar = transformed.bar + 'T';

	return transformed;
}