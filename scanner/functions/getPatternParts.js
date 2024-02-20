function getPatternParts(pattern, options) {
        let { parts } = micromatch.scan(pattern, Object.assign(Object.assign({}, options), { parts: true }));
        /**
         * The scan method returns an empty array in some cases.
         * See micromatch/picomatch#58 for more details.
         */
        if (parts.length === 0) {
            parts = [pattern];
        }
        /**
         * The scan method does not return an empty part for the pattern with a forward slash.
         * This is another part of micromatch/picomatch#58.
         */
        if (parts[0].startsWith('/')) {
            parts[0] = parts[0].slice(1);
            parts.unshift('');
        }
        return parts;
    }