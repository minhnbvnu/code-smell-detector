function getWorks(source, _Provider, options) {
        const patterns = patternManager.transform([].concat(source));
        const settings = new settings_1.default(options);
        const tasks = taskManager.generate(patterns, settings);
        const provider = new _Provider(settings);
        return tasks.map(provider.read, provider);
    }