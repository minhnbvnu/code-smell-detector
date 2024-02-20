function _assertClass1(instance, klass) {
	if (!(instance instanceof klass)) {
		throw new Error(`expected instance of ${klass.name}`);
	}
	return instance.ptr;
}