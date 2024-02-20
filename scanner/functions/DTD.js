function DTD(name, publicIdentifier, systemIdentifier) {
	ParentNode.call(this);
	this.name = name;
	this.publicIdentifier = publicIdentifier;
	this.systemIdentifier = systemIdentifier;
	this.nodeType = NodeType.DTD;
}