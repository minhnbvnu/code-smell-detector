function prettyCase(string) {
	return string.match(matchRegex).map(capitalize).join(' ')
}