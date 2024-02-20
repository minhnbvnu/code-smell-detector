function updateTsconfigFiles(program, changeTracker, oldToNew, oldFileOrDirPath, newFileOrDirPath, currentDirectory, useCaseSensitiveFileNames) {
            const { configFile } = program.getCompilerOptions();
            if (!configFile)
                return;
            const configDir = getDirectoryPath(configFile.fileName);
            const jsonObjectLiteral = getTsConfigObjectLiteralExpression(configFile);
            if (!jsonObjectLiteral)
                return;
            forEachProperty(jsonObjectLiteral, (property, propertyName) => {
                switch (propertyName) {
                    case "files":
                    case "include":
                    case "exclude": {
                        const foundExactMatch = updatePaths(property);
                        if (foundExactMatch || propertyName !== "include" || !isArrayLiteralExpression(property.initializer))
                            return;
                        const includes = mapDefined(property.initializer.elements, (e) => isStringLiteral(e) ? e.text : void 0);
                        if (includes.length === 0)
                            return;
                        const matchers = getFileMatcherPatterns(configDir, 
                        /*excludes*/
                        [], includes, useCaseSensitiveFileNames, currentDirectory);
                        if (getRegexFromPattern(Debug.checkDefined(matchers.includeFilePattern), useCaseSensitiveFileNames).test(oldFileOrDirPath) && !getRegexFromPattern(Debug.checkDefined(matchers.includeFilePattern), useCaseSensitiveFileNames).test(newFileOrDirPath)) {
                            changeTracker.insertNodeAfter(configFile, last(property.initializer.elements), factory.createStringLiteral(relativePath(newFileOrDirPath)));
                        }
                        return;
                    }
                    case "compilerOptions":
                        forEachProperty(property.initializer, (property2, propertyName2) => {
                            const option = getOptionFromName(propertyName2);
                            Debug.assert((option == null ? void 0 : option.type) !== "listOrElement");
                            if (option && (option.isFilePath || option.type === "list" && option.element.isFilePath)) {
                                updatePaths(property2);
                            }
                            else if (propertyName2 === "paths") {
                                forEachProperty(property2.initializer, (pathsProperty) => {
                                    if (!isArrayLiteralExpression(pathsProperty.initializer))
                                        return;
                                    for (const e of pathsProperty.initializer.elements) {
                                        tryUpdateString(e);
                                    }
                                });
                            }
                        });
                        return;
                }
            });
            function updatePaths(property) {
                const elements = isArrayLiteralExpression(property.initializer) ? property.initializer.elements : [property.initializer];
                let foundExactMatch = false;
                for (const element of elements) {
                    foundExactMatch = tryUpdateString(element) || foundExactMatch;
                }
                return foundExactMatch;
            }
            function tryUpdateString(element) {
                if (!isStringLiteral(element))
                    return false;
                const elementFileName = combinePathsSafe(configDir, element.text);
                const updated = oldToNew(elementFileName);
                if (updated !== void 0) {
                    changeTracker.replaceRangeWithText(configFile, createStringRange(element, configFile), relativePath(updated));
                    return true;
                }
                return false;
            }
            function relativePath(path) {
                return getRelativePathFromDirectory(configDir, path, 
                /*ignoreCase*/
                !useCaseSensitiveFileNames);
            }
        }