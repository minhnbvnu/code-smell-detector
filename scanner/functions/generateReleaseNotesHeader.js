async function generateReleaseNotesHeader(repo, release, definitionId, variants, dependencies) {
    releaseNotesHeaderTemplate = releaseNotesHeaderTemplate || handlebars.compile(await asyncUtils.readFile(path.join(__dirname, '..', 'assets', 'release-notes-header.md')));
    const data = {
        version: configUtils.getVersionFromRelease(release, definitionId),
        image: definitionId,
        release: release,
        annotation: dependencies.annotation,
        repository: repo,
        variants: variants,
        hasVariants: variants && variants[0]
    }
    return releaseNotesHeaderTemplate(data);
}