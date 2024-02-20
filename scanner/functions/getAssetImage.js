function getAssetImage(xdNode, ctx) {
	let path = getImagePath(xdNode);
	if (!path && ctx) { ctx.log.warn('Image does not have a Flutter image name.', xdNode); }
	return `const AssetImage('${path || ''}')`;
}