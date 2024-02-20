function releaseDocument(fileName, compilationSettings, scriptKind, impliedNodeFormat) {
                const path = toPath(fileName, currentDirectory, getCanonicalFileName);
                const key = getKeyForCompilationSettings(compilationSettings);
                return releaseDocumentWithKey(path, key, scriptKind, impliedNodeFormat);
            }