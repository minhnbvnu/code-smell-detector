function scandirSync(path, optionsOrSettings) {
        const settings = getSettings(optionsOrSettings);
        return sync.read(path, settings);
    }