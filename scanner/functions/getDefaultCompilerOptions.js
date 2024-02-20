function getDefaultCompilerOptions(configFileName) {
            const options = configFileName && getBaseFileName(configFileName) === "jsconfig.json" ? { allowJs: true, maxNodeModuleJsDepth: 2, allowSyntheticDefaultImports: true, skipLibCheck: true, noEmit: true } : {};
            return options;
        }