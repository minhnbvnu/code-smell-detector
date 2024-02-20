async function generateReleaseNotesPart(contents, release, stubRegistry, stubRegistryPath, definitionId, variant) {
    releaseNotesVariantPartTemplate = releaseNotesVariantPartTemplate || handlebars.compile(await asyncUtils.readFile(path.join(__dirname, '..', 'assets', 'release-notes-variant-part.md')));
    const markdownFormatter = markdownFormatterFactory.getFormatter();
    const formattedContents = getFormattedContents(contents, markdownFormatter);
    formattedContents.hasPip = formattedContents.pip.length > 0 || formattedContents.pipx.length > 0;
    formattedContents.tags = configUtils.getTagList(definitionId, release, 'full-only', stubRegistry,  stubRegistryPath, variant);
    formattedContents.variant = variant;

    // architecture property could be a single string, an array, or an object of arrays by variant
    let architectures = configUtils.getBuildSettings(definitionId).architectures || ['linux/amd64'];
    if (!Array.isArray(architectures)) {
        architectures = architectures[variant];
    }
    formattedContents.architectures = architectures.reduce((prev, current, index) => index > 0 ? `${prev}, ${current}` : current, '');
    return releaseNotesVariantPartTemplate(formattedContents);
}