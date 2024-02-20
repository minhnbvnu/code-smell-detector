function acquireDocument(fileName, compilationSettings, scriptSnapshot, version2, scriptKind, languageVersionOrOptions) {
                const path = toPath(fileName, currentDirectory, getCanonicalFileName);
                const key = getKeyForCompilationSettings(getCompilationSettings(compilationSettings));
                return acquireDocumentWithKey(fileName, path, compilationSettings, key, scriptSnapshot, version2, scriptKind, languageVersionOrOptions);
            }