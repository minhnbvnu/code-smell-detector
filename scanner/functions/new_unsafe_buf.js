function new_unsafe_buf(len) {
	/* jshint -W056 */
	return has_buf ? Buffer.allocUnsafe(len) : new Array(len);
	/* jshint +W056 */
}