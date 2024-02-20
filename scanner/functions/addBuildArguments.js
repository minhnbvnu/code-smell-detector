function addBuildArguments(prepResult) {
    const buildSettings = configUtils.getBuildSettings(prepResult.meta.definitionId);

    for (let buildArg in buildSettings.buildArgs || {}) {
        prepResult.devContainerDockerfileModified = `ARG ${buildArg}="${buildSettings.buildArgs[buildArg]}"\n` + prepResult.devContainerDockerfileModified;
    }

    if (buildSettings.variantBuildArgs) {
        for (let buildArg in buildSettings.variantBuildArgs[prepResult.meta.variant] || {}) {
            const arg = `ARG ${buildArg}="${buildSettings.variantBuildArgs[prepResult.meta.variant][buildArg]}"`;
            prepResult.devContainerDockerfileModified = (prepResult.devContainerDockerfileModified).replace(new RegExp(`.*${buildArg}=.*`), arg);
        }
    }

    return prepResult.devContainerDockerfileModified;
}