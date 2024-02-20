function validateLocaleAndSetLanguage(locale, sys2, errors) {
            const lowerCaseLocale = locale.toLowerCase();
            const matchResult = /^([a-z]+)([_\-]([a-z]+))?$/.exec(lowerCaseLocale);
            if (!matchResult) {
                if (errors) {
                    errors.push(createCompilerDiagnostic(Diagnostics.Locale_must_be_of_the_form_language_or_language_territory_For_example_0_or_1, "en", "ja-jp"));
                }
                return;
            }
            const language = matchResult[1];
            const territory = matchResult[3];
            if (contains(supportedLocaleDirectories, lowerCaseLocale) && !trySetLanguageAndTerritory(language, territory, errors)) {
                trySetLanguageAndTerritory(language, 
                /*territory*/
                void 0, errors);
            }
            setUILocale(locale);
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
        }