function updateDocumentWithKey(fileName, path, compilationSettings, key, scriptSnapshot, version2, scriptKind, languageVersionOrOptions) {
                return acquireOrUpdateDocument(fileName, path, getCompilationSettings(compilationSettings), key, scriptSnapshot, version2, 
                /*acquiring*/
                false, scriptKind, languageVersionOrOptions);
            }