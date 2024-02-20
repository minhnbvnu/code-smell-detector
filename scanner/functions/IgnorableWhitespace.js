function IgnorableWhitespace(locator, data) {
	Node.call(this, locator);
	this.data = data;
	this.nodeType = NodeType.IGNORABLE_WHITESPACE;
}