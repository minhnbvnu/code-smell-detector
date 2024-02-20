function convertOptionsFromJson(optionsNameMap, jsonOptions, basePath, defaultOptions, diagnostics, errors) {
            if (!jsonOptions) {
                return;
            }
            for (const id in jsonOptions) {
                const opt = optionsNameMap.get(id);
                if (opt) {
                    (defaultOptions || (defaultOptions = {}))[opt.name] = convertJsonOption(opt, jsonOptions[id], basePath, errors);
                }
                else {
                    errors.push(createUnknownOptionError(id, diagnostics, createCompilerDiagnostic));
                }
            }
            return defaultOptions;
        }