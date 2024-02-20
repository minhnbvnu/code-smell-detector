function expandBraceExpansion(pattern) {
        return micromatch.braces(pattern, {
            expand: true,
            nodupes: true
        });
    }