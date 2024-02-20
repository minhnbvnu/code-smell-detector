function getDefaultBuildMethodName(xdNode) {
	return "build" + cleanClassName(xdNode.name, _getNormalizeNames());
}