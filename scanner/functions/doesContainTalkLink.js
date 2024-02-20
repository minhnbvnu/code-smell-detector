function doesContainTalkLink(text) {
	if (!text) {
		return false
	}

	// TODO: there is most definitely a more reliable way,
	// but this works for now
	const fakeUrl = generateURLForToken()
	return text.includes(fakeUrl)
}