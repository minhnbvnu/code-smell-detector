function SkippedEntity(name) {
	Node.call(this);
	this.name = name;
	this.nodeType = NodeType.SKIPPED_ENTITY;
}