function isReleaseOrTagFilteringEnabled(action, workflowGraph) {
    let isFilteringEnabled = true;

    workflowGraph.edges.forEach(edge => {
        const releaseOrTagRegExp = action === 'release' ? /^~(release)$/ : /^~(tag)$/;

        if (edge.src.match(releaseOrTagRegExp)) {
            isFilteringEnabled = false;
        }
    });

    return isFilteringEnabled;
}