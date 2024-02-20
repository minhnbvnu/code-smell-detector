function convertToOptionsWithAbsolutePaths(options, toAbsolutePath) {
            const result = {};
            const optionsNameMap = getOptionsNameMap().optionsNameMap;
            for (const name in options) {
                if (hasProperty(options, name)) {
                    result[name] = convertToOptionValueWithAbsolutePaths(optionsNameMap.get(name.toLowerCase()), options[name], toAbsolutePath);
                }
            }
            if (result.configFilePath) {
                result.configFilePath = toAbsolutePath(result.configFilePath);
            }
            return result;
        }