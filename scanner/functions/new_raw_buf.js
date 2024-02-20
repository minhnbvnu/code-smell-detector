function new_raw_buf(len) {
	/* jshint -W056 */
	return has_buf ? Buffer.alloc(len) : new Array(len);
	/* jshint +W056 */
}