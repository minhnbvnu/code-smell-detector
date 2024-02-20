function parseArray(source, transform, separator = ',') {
	return new ArrayParser(source, transform, separator).parse();
}