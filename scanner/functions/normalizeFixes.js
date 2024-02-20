function normalizeFixes(descriptor, sourceCode) {
        if (typeof descriptor.fix !== "function") {
            return null;
        }
        // @type {null | Fix | Fix[] | IterableIterator<Fix>}
        const fix = descriptor.fix(ruleFixer);
        // Merge to one.
        if (fix && Symbol.iterator in fix) {
            return mergeFixes(Array.from(fix), sourceCode);
        }
        assertValidFix(fix);
        return fix;
    }