function StackItem(namespaceURI, localName, attributes, node) {
	this.localName = localName;
	this.namespaceURI = namespaceURI;
	this.attributes = attributes;
	this.node = node;
}