function processCLIEngineLintReport(cliEngine, { results }) {
        const descriptor = {
            configurable: true,
            enumerable: true,
            get() {
                return getOrFindUsedDeprecatedRules(cliEngine, this.filePath);
            }
        };
        for (const result of results) {
            Object.defineProperty(result, "usedDeprecatedRules", descriptor);
        }
        return results;
    }