function getTypingNamesFromSourceFileNames(fileNames2) {
                const fromFileNames = mapDefined(fileNames2, (j) => {
                    if (!hasJSFileExtension(j))
                        return void 0;
                    const inferredTypingName = removeFileExtension(toFileNameLowerCase(getBaseFileName(j)));
                    const cleanedTypingName = removeMinAndVersionNumbers(inferredTypingName);
                    return safeList.get(cleanedTypingName);
                });
                if (fromFileNames.length) {
                    addInferredTypings(fromFileNames, "Inferred typings from file names");
                }
                const hasJsxFile = some(fileNames2, (f) => fileExtensionIs(f, ".jsx" /* Jsx */));
                if (hasJsxFile) {
                    if (log)
                        log(`Inferred 'react' typings due to presence of '.jsx' extension`);
                    addInferredTyping("react");
                }
            }