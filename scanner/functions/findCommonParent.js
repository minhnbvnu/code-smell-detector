function findCommonParent(paths) {
    return paths.reduce(
        (common, path) => common.commonPrefixPath(path),
        paths[0] || new Path([])
    );
}