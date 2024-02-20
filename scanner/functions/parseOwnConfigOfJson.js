function parseOwnConfigOfJson(json, host, basePath, configFileName, errors) {
            if (hasProperty(json, "excludes")) {
                errors.push(createCompilerDiagnostic(Diagnostics.Unknown_option_excludes_Did_you_mean_exclude));
            }
            const options = convertCompilerOptionsFromJsonWorker(json.compilerOptions, basePath, errors, configFileName);
            const typeAcquisition = convertTypeAcquisitionFromJsonWorker(json.typeAcquisition, basePath, errors, configFileName);
            const watchOptions = convertWatchOptionsFromJsonWorker(json.watchOptions, basePath, errors);
            json.compileOnSave = convertCompileOnSaveOptionFromJson(json, basePath, errors);
            let extendedConfigPath;
            if (json.extends || json.extends === "") {
                if (!isCompilerOptionsValue(extendsOptionDeclaration, json.extends)) {
                    errors.push(createCompilerDiagnostic(Diagnostics.Compiler_option_0_requires_a_value_of_type_1, "extends", getCompilerOptionValueTypeString(extendsOptionDeclaration)));
                }
                else {
                    const newBase = configFileName ? directoryOfCombinedPath(configFileName, basePath) : basePath;
                    if (isString(json.extends)) {
                        extendedConfigPath = getExtendsConfigPath(json.extends, host, newBase, errors, createCompilerDiagnostic);
                    }
                    else {
                        extendedConfigPath = [];
                        for (const fileName of json.extends) {
                            if (isString(fileName)) {
                                extendedConfigPath = append(extendedConfigPath, getExtendsConfigPath(fileName, host, newBase, errors, createCompilerDiagnostic));
                            }
                            else {
                                errors.push(createCompilerDiagnostic(Diagnostics.Compiler_option_0_requires_a_value_of_type_1, "extends", getCompilerOptionValueTypeString(extendsOptionDeclaration.element)));
                            }
                        }
                    }
                }
            }
            return { raw: json, options, watchOptions, typeAcquisition, extendedConfigPath };
        }