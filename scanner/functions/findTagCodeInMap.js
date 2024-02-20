function findTagCodeInMap(dictMap, key) {
	for (let [tagCodeNum, tagName] of dictMap) {
		return key === tagCodeNum || key === tagName
	}
	return false
}