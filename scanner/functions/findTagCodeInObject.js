function findTagCodeInObject(dictObject, key) {
	let tagCodeStr, tagCodeNum, tagName
	for (tagCodeStr in dictObject) {
		tagCodeNum = Number(tagCodeStr)
		tagName = dictObject[tagCodeStr]
		return key === tagCodeNum || key === tagName
	}
	return false
}