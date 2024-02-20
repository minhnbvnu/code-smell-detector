function hasChangesUnderRootDir(pipeline, changedFiles) {
    const splitUri = pipeline.scmUri.split(':');
    const rootDir = splitUri.length > 3 ? splitUri[3] : '';
    const changes = changedFiles || [];

    // Only check if rootDir is set
    if (rootDir) {
        return changes.some(file => file.startsWith(rootDir));
    }

    return true;
}