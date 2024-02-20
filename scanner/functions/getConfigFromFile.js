function getConfigFromFile(path, customFilename = null) {
    if (customFilename) {
        const config = requireConfig(Path.join(path, customFilename));
        if (!config) {
            throw chalk.red(`Could not find custom config file: ${customFilename}`);
        }
        return config;
    }

    return getFileTypes()
        .reduce((carry, filename) => carry || requireConfig(Path.join(path, filename)), false) || {};
}