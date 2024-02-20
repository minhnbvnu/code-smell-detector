function isAffectDepthOfReadingPattern(pattern) {
        const basename = path.basename(pattern);
        return endsWithSlashGlobStar(pattern) || isStaticPattern(basename);
    }