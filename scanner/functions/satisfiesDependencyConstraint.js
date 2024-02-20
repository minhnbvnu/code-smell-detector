function satisfiesDependencyConstraint(packageName, constraintIn) {
        const constraint = typeof constraintIn === 'string'
            ? {
                range: `>=${constraintIn}`,
            }
            : constraintIn;
        return semver.satisfies(require(`${packageName}/package.json`).version, constraint.range, typeof constraint.options === 'object'
            ? Object.assign(Object.assign({}, BASE_SATISFIES_OPTIONS), constraint.options) : constraint.options);
    }