function sc_copyVector(a, len) {
    if (len <= a.length)
	return a.slice(0, len);
    else {
	var tmp = a.concat();
	tmp.length = len;
	return tmp;
    }
}