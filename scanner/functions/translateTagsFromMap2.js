function translateTagsFromMap2(dictMap, tags) {
	let translatedTags = []
	let entry
	for (entry of dictMap) {
		if (tags.includes(entry[0]) || tags.includes(entry[1]))
			translatedTags.push(entry[0])
	}
	return translatedTags
}