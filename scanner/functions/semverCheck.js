function semverCheck(version) {
        return semver.satisfies(ts.version, `>= ${version}.0 || >= ${version}.1-rc || >= ${version}.0-beta`, {
            includePrerelease: true,
        });
    }