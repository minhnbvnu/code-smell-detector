function isPermissible(dependency) {
        const licenses = dependency.licenses;

        if (Array.isArray(licenses)) {
            return licenses.some(license => isPermissible({
                name: dependency.name,
                licenses: license
            }));
        }

        return OPEN_SOURCE_LICENSES.some(license => license.test(licenses));
    }