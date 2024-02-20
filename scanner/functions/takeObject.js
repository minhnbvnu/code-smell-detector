function takeObject(idx) {
	const ret = getObject(idx);
	dropObject(idx);
	return ret;
}