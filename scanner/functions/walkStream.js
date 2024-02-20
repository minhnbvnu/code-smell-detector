function walkStream(directory, optionsOrSettings) {
        const settings = getSettings(optionsOrSettings);
        const provider = new stream_1.default(directory, settings);
        return provider.read();
    }