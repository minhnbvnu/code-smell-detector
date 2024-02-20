function serializeOptionBaseObject(options, { optionsNameMap }, pathOptions) {
            const result = /* @__PURE__ */ new Map();
            const getCanonicalFileName = pathOptions && createGetCanonicalFileName(pathOptions.useCaseSensitiveFileNames);
            for (const name in options) {
                if (hasProperty(options, name)) {
                    if (optionsNameMap.has(name) && (optionsNameMap.get(name).category === Diagnostics.Command_line_Options || optionsNameMap.get(name).category === Diagnostics.Output_Formatting)) {
                        continue;
                    }
                    const value = options[name];
                    const optionDefinition = optionsNameMap.get(name.toLowerCase());
                    if (optionDefinition) {
                        Debug.assert(optionDefinition.type !== "listOrElement");
                        const customTypeMap = getCustomTypeMapOfCommandLineOption(optionDefinition);
                        if (!customTypeMap) {
                            if (pathOptions && optionDefinition.isFilePath) {
                                result.set(name, getRelativePathFromFile(pathOptions.configFilePath, getNormalizedAbsolutePath(value, getDirectoryPath(pathOptions.configFilePath)), getCanonicalFileName));
                            }
                            else {
                                result.set(name, value);
                            }
                        }
                        else {
                            if (optionDefinition.type === "list") {
                                result.set(name, value.map((element) => getNameOfCompilerOptionValue(element, customTypeMap)));
                            }
                            else {
                                result.set(name, getNameOfCompilerOptionValue(value, customTypeMap));
                            }
                        }
                    }
                }
            }
            return result;
        }