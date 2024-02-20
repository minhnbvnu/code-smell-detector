function cloneCompilerOptions(options) {
            const result = clone(options);
            setConfigFileInOptions(result, options && options.configFile);
            return result;
        }