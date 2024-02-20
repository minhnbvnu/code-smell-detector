function addLabels(prepResult) {
    const versionLabel = `LABEL version="${prepResult.meta.version}"\n`
    const idLabel = `LABEL ${imageLabelPrefix}.id="${prepResult.meta.definitionId}"\n`
    const variantLabel = `LABEL ${imageLabelPrefix}.variant="${prepResult.meta.variant}"\n`
    const releaseLabel = `LABEL ${imageLabelPrefix}.release="${prepResult.meta.gitRepositoryRelease}"\n`
    const sourceLabel = `LABEL ${imageLabelPrefix}.source="${prepResult.meta.gitRepository}"\n`
    const timestampLabel = `LABEL ${imageLabelPrefix}.timestamp="${prepResult.meta.buildTimestamp}"\n`

    let dockerFileContentsWithLabels = prepResult.devContainerDockerfileModified + '\n' + versionLabel + idLabel + variantLabel + releaseLabel + sourceLabel + timestampLabel;
    return dockerFileContentsWithLabels;
}