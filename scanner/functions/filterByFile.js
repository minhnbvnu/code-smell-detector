function filterByFile(nodes, fileFilter, parentPath) {
    let children = [];

    for (let i = 0; i < nodes.length; i++) {
        const child = nodes[i];
        const childFullPath = (parentPath ? parentPath + '/' : '') + child.file;

        const isChildUnderFilter =
            fileFilter === childFullPath ||
            fileFilter.indexOf(childFullPath + '/') === 0;
        const isChildAboveFilter =
            childFullPath.indexOf(fileFilter + '/') === 0;

        if (isChildUnderFilter) {
            // flatten and continue looking underneath
            children = [
                ...children,
                ...filterByFile(child.children, fileFilter, childFullPath)
            ];
        } else if (isChildAboveFilter) {
            // remove the parent path and add everything underneath
            const charsToRemoveFromFile =
                fileFilter.length - (parentPath ? parentPath.length : 0);
            let childFilename = child.file.slice(charsToRemoveFromFile);
            if (childFilename[0] === '/') {
                childFilename = childFilename.slice(1);
            }
            children.push({
                ...child,
                file: childFilename
            });
        }
    }
    return children;
}