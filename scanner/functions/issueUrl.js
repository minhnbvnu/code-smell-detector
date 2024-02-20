function issueUrl() {
    if (pkgJson.repository && pkgJson.repository.url && ~pkgJson.repository.url.indexOf('github.com')) {
        var gitUrl = gufg(pkgJson.repository.url);

        if (gitUrl) {
            return `${gitUrl}/issues/`;
        }
    }
}