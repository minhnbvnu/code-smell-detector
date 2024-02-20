function _getSvgTransform(transform) {
	let result;

	if (transform.a !== 1.0 || transform.b !== 0.0 || transform.c !== 0.0 || transform.d !== 1.0) {
		// Use full transform
		const a = $.fix(transform.a, 6);
		const b = $.fix(transform.b, 6);
		const c = $.fix(transform.c, 6);
		const d = $.fix(transform.d, 6);
		const e = $.fix(transform.e, 2);
		const f = $.fix(transform.f, 2);
		result = `matrix(${a}, ${b}, ${c}, ${d}, ${e}, ${f})`;
	} else if (transform.e !== 0.0 || transform.f !== 0.0) {
		// Use offset transform
		const e = $.fix(transform.e, 2);
		const f = $.fix(transform.f, 2);
		result = `translate(${e}, ${f})`;
	} else {
		result = "";
	}
	return result;
}