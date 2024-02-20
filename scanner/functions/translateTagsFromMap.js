function translateTagsFromMap(dictMap, tags) {
	let translatedTags = []
	for (let [tagCodeNum, tagName] of dictMap) {
		if (tags.includes(tagCodeNum) || tags.includes(tagName))
			translatedTags.push(tagCodeNum)
	}
	return translatedTags
}