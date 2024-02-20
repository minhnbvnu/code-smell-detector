function acquireDocumentWithKey(fileName, path, compilationSettings, key, scriptSnapshot, version2, scriptKind, languageVersionOrOptions) {
                return acquireOrUpdateDocument(fileName, path, compilationSettings, key, scriptSnapshot, version2, 
                /*acquiring*/
                true, scriptKind, languageVersionOrOptions);
            }