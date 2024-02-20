function replaceVariantArg(prepResult) {
    const variantArg = `ARG VARIANT="${prepResult.meta.variant}"\n`;

    prepResult.devContainerDockerfileModified = (prepResult.devContainerDockerfileModified).replace(new RegExp(".*ARG VARIANT=.*"), variantArg);
    return prepResult.devContainerDockerfileModified;
}