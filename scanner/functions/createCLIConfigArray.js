function createCLIConfigArray({ cliConfigData, configArrayFactory, cwd, ignorePath, specificConfigPath }) {
        const cliConfigArray = configArrayFactory.create(cliConfigData, { name: "CLIOptions" });
        cliConfigArray.unshift(...(ignorePath
            ? configArrayFactory.loadESLintIgnore(ignorePath)
            : configArrayFactory.loadDefaultESLintIgnore()));
        if (specificConfigPath) {
            cliConfigArray.unshift(...configArrayFactory.loadFile(specificConfigPath, { name: "--config", basePath: cwd }));
        }
        return cliConfigArray;
    }