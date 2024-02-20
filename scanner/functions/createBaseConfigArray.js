function createBaseConfigArray({ configArrayFactory, baseConfigData, rulePaths, cwd, loadRules }) {
        const baseConfigArray = configArrayFactory.create(baseConfigData, { name: "BaseConfig" });
        /*
         * Create the config array element for the default ignore patterns.
         * This element has `ignorePattern` property that ignores the default
         * patterns in the current working directory.
         */
        baseConfigArray.unshift(configArrayFactory.create({ ignorePatterns: IgnorePattern.DefaultPatterns }, { name: "DefaultIgnorePattern" })[0]);
        /*
         * Load rules `--rulesdir` option as a pseudo plugin.
         * Use a pseudo plugin to define rules of `--rulesdir`, so we can validate
         * the rule's options with only information in the config array.
         */
        if (rulePaths && rulePaths.length > 0) {
            baseConfigArray.push({
                type: "config",
                name: "--rulesdir",
                filePath: "",
                plugins: {
                    "": new ConfigDependency({
                        definition: {
                            rules: rulePaths.reduce((map, rulesPath) => Object.assign(map, loadRules(rulesPath, cwd)), {})
                        },
                        filePath: "",
                        id: "",
                        importerName: "--rulesdir",
                        importerPath: ""
                    })
                }
            });
        }
        return baseConfigArray;
    }