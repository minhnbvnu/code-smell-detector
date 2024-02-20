async function processStub(userDockerFile, definitionId, repo, release, registry, registryPath) {
    const devContainerImageVersion = configUtils.majorFromRelease(release, definitionId);
    const relativePath = configUtils.getDefinitionPath(definitionId, true);
    let fromSection = `# ${dockerFilePreamble}https://github.com/${repo}/tree/${release}/${relativePath}/.devcontainer/Dockerfile\n\n`;
    // The VARIANT arg allows this value to be set from devcontainer.json, handle it if found
    if (/ARG\s+VARIANT\s*=/.exec(userDockerFile) !== null && configUtils.getVariants(definitionId) != null) {
        const variant = configUtils.getVariants(definitionId)[0];
        const tagWithVariant = configUtils.getTagsForVersion(definitionId, devContainerImageVersion, registry, registryPath, '${VARIANT}')[0];
        // Handle scenario where "# [Choice]" comment exists
        const choiceCaptureGroup = /(#\s+\[Choice\].+\n)ARG\s+VARIANT\s*=/.exec(userDockerFile);
        if (choiceCaptureGroup) {
            fromSection += choiceCaptureGroup[1];
        }
        fromSection += `ARG VARIANT="${variant}"\nFROM ${tagWithVariant}`;
    } else {
        const imageTag = configUtils.getTagsForVersion(definitionId, devContainerImageVersion, registry, registryPath)[0];
        fromSection += `FROM ${imageTag}`;
    }

    return replaceFrom(userDockerFile, fromSection);
}