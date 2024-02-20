function isNotSupportingVersion(aCase) {
        return (
            !aCase.supported ||
            options.version.intersects(getSemverRange(`<${aCase.supported}`))
        )
    }