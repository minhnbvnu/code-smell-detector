function ParentNode(locator) {
	Node.call(this, locator);
	this.lastChild = null;
	this._endLocator = null;
}