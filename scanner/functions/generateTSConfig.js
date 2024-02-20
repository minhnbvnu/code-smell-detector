function generateTSConfig(options, fileNames, newLine) {
            const compilerOptionsMap = getSerializedCompilerOption(options);
            return writeConfigurations();
            function makePadding(paddingLength) {
                return Array(paddingLength + 1).join(" ");
            }
            function isAllowedOptionForOutput({ category, name, isCommandLineOnly }) {
                const categoriesToSkip = [Diagnostics.Command_line_Options, Diagnostics.Editor_Support, Diagnostics.Compiler_Diagnostics, Diagnostics.Backwards_Compatibility, Diagnostics.Watch_and_Build_Modes, Diagnostics.Output_Formatting];
                return !isCommandLineOnly && category !== void 0 && (!categoriesToSkip.includes(category) || compilerOptionsMap.has(name));
            }
            function writeConfigurations() {
                const categorizedOptions = /* @__PURE__ */ new Map();
                categorizedOptions.set(Diagnostics.Projects, []);
                categorizedOptions.set(Diagnostics.Language_and_Environment, []);
                categorizedOptions.set(Diagnostics.Modules, []);
                categorizedOptions.set(Diagnostics.JavaScript_Support, []);
                categorizedOptions.set(Diagnostics.Emit, []);
                categorizedOptions.set(Diagnostics.Interop_Constraints, []);
                categorizedOptions.set(Diagnostics.Type_Checking, []);
                categorizedOptions.set(Diagnostics.Completeness, []);
                for (const option of optionDeclarations) {
                    if (isAllowedOptionForOutput(option)) {
                        let listForCategory = categorizedOptions.get(option.category);
                        if (!listForCategory)
                            categorizedOptions.set(option.category, listForCategory = []);
                        listForCategory.push(option);
                    }
                }
                let marginLength = 0;
                let seenKnownKeys = 0;
                const entries = [];
                categorizedOptions.forEach((options2, category) => {
                    if (entries.length !== 0) {
                        entries.push({ value: "" });
                    }
                    entries.push({ value: `/* ${getLocaleSpecificMessage(category)} */` });
                    for (const option of options2) {
                        let optionName;
                        if (compilerOptionsMap.has(option.name)) {
                            optionName = `"${option.name}": ${JSON.stringify(compilerOptionsMap.get(option.name))}${(seenKnownKeys += 1) === compilerOptionsMap.size ? "" : ","}`;
                        }
                        else {
                            optionName = `// "${option.name}": ${JSON.stringify(getDefaultValueForOption(option))},`;
                        }
                        entries.push({
                            value: optionName,
                            description: `/* ${option.description && getLocaleSpecificMessage(option.description) || option.name} */`
                        });
                        marginLength = Math.max(optionName.length, marginLength);
                    }
                });
                const tab = makePadding(2);
                const result = [];
                result.push(`{`);
                result.push(`${tab}"compilerOptions": {`);
                result.push(`${tab}${tab}/* ${getLocaleSpecificMessage(Diagnostics.Visit_https_Colon_Slash_Slashaka_ms_Slashtsconfig_to_read_more_about_this_file)} */`);
                result.push("");
                for (const entry of entries) {
                    const { value, description: description2 = "" } = entry;
                    result.push(value && `${tab}${tab}${value}${description2 && makePadding(marginLength - value.length + 2) + description2}`);
                }
                if (fileNames.length) {
                    result.push(`${tab}},`);
                    result.push(`${tab}"files": [`);
                    for (let i = 0; i < fileNames.length; i++) {
                        result.push(`${tab}${tab}${JSON.stringify(fileNames[i])}${i === fileNames.length - 1 ? "" : ","}`);
                    }
                    result.push(`${tab}]`);
                }
                else {
                    result.push(`${tab}}`);
                }
                result.push(`}`);
                return result.join(newLine) + newLine;
            }
        }