function convertToProgramBuildInfoCompilerOptions(options) {
                let result;
                const { optionsNameMap } = getOptionsNameMap();
                for (const name of getOwnKeys(options).sort(compareStringsCaseSensitive)) {
                    const optionInfo = optionsNameMap.get(name.toLowerCase());
                    if (optionInfo == null ? void 0 : optionInfo.affectsBuildInfo) {
                        (result || (result = {}))[name] = convertToReusableCompilerOptionValue(optionInfo, options[name], relativeToBuildInfoEnsuringAbsolutePath);
                    }
                }
                return result;
            }