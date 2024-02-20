function assertEslintrcConfig(linter) {
        const { configType } = internalSlotsMap.get(linter);
        if (configType === "flat") {
            throw new Error("This method cannot be used with flat config. Add your entries directly into the config array.");
        }
    }