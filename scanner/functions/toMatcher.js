function toMatcher(patterns) {
        if (patterns.length === 0) {
            return null;
        }
        return patterns.map(pattern => {
            if (/^\.[/\\]/u.test(pattern)) {
                return new Minimatch(pattern.slice(2), 
                // `./*.js` should not match with `subdir/foo.js`
                { ...minimatchOpts, matchBase: false });
            }
            return new Minimatch(pattern, minimatchOpts);
        });
    }