function processLintReport(eslint, { results }) {
        const descriptor = {
            configurable: true,
            enumerable: true,
            get() {
                return getOrFindUsedDeprecatedRules(eslint, this.filePath);
            }
        };
        for (const result of results) {
            Object.defineProperty(result, "usedDeprecatedRules", descriptor);
        }
        return results;
    }