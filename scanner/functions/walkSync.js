function walkSync(directory, optionsOrSettings) {
        const settings = getSettings(optionsOrSettings);
        const provider = new sync_1.default(directory, settings);
        return provider.read();
    }