function calculateTree(root) {
	var rootLayout = [];

	for (var i=0; i<root.children.length; i++) {
		var child = root.children[i];
		rootLayout.push({
			name: child.id,
			tagName: child.tagName,
			left: child.offsetLeft,
			top: child.offsetTop, 
			width: child.offsetWidth,
			height: child.offsetHeight,
			children: calculateTree(child),
			style: getStyleMap(child.getAttribute('style')),
			rowStyle: child.getAttribute('style')
		})
	}

	return rootLayout;
}