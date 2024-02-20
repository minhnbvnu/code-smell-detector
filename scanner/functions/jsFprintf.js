function jsFprintf(stream) {
	var args = Array.prototype.slice.call(arguments, 1);
	return (stream.write(jsSprintf.apply(this, args)));
}