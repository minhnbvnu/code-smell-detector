function takeObject1(idx) {
	const ret = getObject1(idx);
	dropObject1(idx);
	return ret;
}