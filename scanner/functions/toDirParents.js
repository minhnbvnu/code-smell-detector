function toDirParents(list) {
    const nodeMap = Object.create(null);
    list.forEach(o => {
        const parent = findOrCreateParent(o.path.parent(), nodeMap);
        parent.addChild(new ReportNode(o.path, o.fileCoverage));
    });

    return Object.values(nodeMap);
}