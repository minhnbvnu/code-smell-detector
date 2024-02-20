function addAllPaths(topPaths, nodeMap, path, node) {
    const parent = findOrCreateParent(
        path.parent(),
        nodeMap,
        (parentPath, parent) => {
            if (parentPath.hasParent()) {
                addAllPaths(topPaths, nodeMap, parentPath, parent);
            } else {
                topPaths.push(parent);
            }
        }
    );

    parent.addChild(node);
}