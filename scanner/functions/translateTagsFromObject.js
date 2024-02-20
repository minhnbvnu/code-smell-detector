function translateTagsFromObject(dictObject, tags) {
	let translatedTags = []
	let tagCodeStr, tagCodeNum, tagName
	for (tagCodeStr in dictObject) {
		tagCodeNum = Number(tagCodeStr)
		tagName = dictObject[tagCodeStr]
		if (tags.includes(tagCodeNum) || tags.includes(tagName))
			translatedTags.push(tagCodeNum)
	}
	return translatedTags
}