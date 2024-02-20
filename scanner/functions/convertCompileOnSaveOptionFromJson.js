function convertCompileOnSaveOptionFromJson(jsonOption, basePath, errors) {
            if (!hasProperty(jsonOption, compileOnSaveCommandLineOption.name)) {
                return false;
            }
            const result = convertJsonOption(compileOnSaveCommandLineOption, jsonOption.compileOnSave, basePath, errors);
            return typeof result === "boolean" && result;
        }