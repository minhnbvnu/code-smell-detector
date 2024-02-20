function parseOwnConfigOfJsonSourceFile(sourceFile, host, basePath, configFileName, errors) {
            const options = getDefaultCompilerOptions(configFileName);
            let typeAcquisition;
            let watchOptions;
            let extendedConfigPath;
            let rootCompilerOptions;
            const optionsIterator = {
                onSetValidOptionKeyValueInParent(parentOption, option, value) {
                    let currentOption;
                    switch (parentOption) {
                        case "compilerOptions":
                            currentOption = options;
                            break;
                        case "watchOptions":
                            currentOption = watchOptions || (watchOptions = {});
                            break;
                        case "typeAcquisition":
                            currentOption = typeAcquisition || (typeAcquisition = getDefaultTypeAcquisition(configFileName));
                            break;
                        default:
                            Debug.fail("Unknown option");
                    }
                    currentOption[option.name] = normalizeOptionValue(option, basePath, value);
                },
                onSetValidOptionKeyValueInRoot(key, _keyNode, value, valueNode) {
                    switch (key) {
                        case "extends":
                            const newBase = configFileName ? directoryOfCombinedPath(configFileName, basePath) : basePath;
                            if (isString(value)) {
                                extendedConfigPath = getExtendsConfigPath(value, host, newBase, errors, (message, arg0) => createDiagnosticForNodeInSourceFile(sourceFile, valueNode, message, arg0));
                            }
                            else {
                                extendedConfigPath = [];
                                for (let index = 0; index < value.length; index++) {
                                    const fileName = value[index];
                                    if (isString(fileName)) {
                                        extendedConfigPath = append(extendedConfigPath, getExtendsConfigPath(fileName, host, newBase, errors, (message, arg0) => createDiagnosticForNodeInSourceFile(sourceFile, valueNode.elements[index], message, arg0)));
                                    }
                                }
                            }
                            return;
                    }
                },
                onSetUnknownOptionKeyValueInRoot(key, keyNode, _value, _valueNode) {
                    if (key === "excludes") {
                        errors.push(createDiagnosticForNodeInSourceFile(sourceFile, keyNode, Diagnostics.Unknown_option_excludes_Did_you_mean_exclude));
                    }
                    if (find(commandOptionsWithoutBuild, (opt) => opt.name === key)) {
                        rootCompilerOptions = append(rootCompilerOptions, keyNode);
                    }
                }
            };
            const json = convertConfigFileToObject(sourceFile, errors, 
            /*reportOptionsErrors*/
            true, optionsIterator);
            if (!typeAcquisition) {
                typeAcquisition = getDefaultTypeAcquisition(configFileName);
            }
            if (rootCompilerOptions && json && json.compilerOptions === void 0) {
                errors.push(createDiagnosticForNodeInSourceFile(sourceFile, rootCompilerOptions[0], Diagnostics._0_should_be_set_inside_the_compilerOptions_object_of_the_config_json_file, getTextOfPropertyName(rootCompilerOptions[0])));
            }
            return { raw: json, options, watchOptions, typeAcquisition, extendedConfigPath };
        }