function trySetLanguageAndTerritory(language2, territory2, errors2) {
                const compilerFilePath = normalizePath(sys2.getExecutingFilePath());
                const containingDirectoryPath = getDirectoryPath(compilerFilePath);
                let filePath = combinePaths(containingDirectoryPath, language2);
                if (territory2) {
                    filePath = filePath + "-" + territory2;
                }
                filePath = sys2.resolvePath(combinePaths(filePath, "diagnosticMessages.generated.json"));
                if (!sys2.fileExists(filePath)) {
                    return false;
                }
                let fileContents = "";
                try {
                    fileContents = sys2.readFile(filePath);
                }
                catch (e) {
                    if (errors2) {
                        errors2.push(createCompilerDiagnostic(Diagnostics.Unable_to_open_file_0, filePath));
                    }
                    return false;
                }
                try {
                    setLocalizedDiagnosticMessages(JSON.parse(fileContents));
                }
                catch (e) {
                    if (errors2) {
                        errors2.push(createCompilerDiagnostic(Diagnostics.Corrupted_locale_file_0, filePath));
                    }
                    return false;
                }
                return true;
            }