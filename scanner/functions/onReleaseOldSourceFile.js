function onReleaseOldSourceFile(oldSourceFile, oldOptions) {
                    const oldSettingsKey = documentRegistry.getKeyForCompilationSettings(oldOptions);
                    documentRegistry.releaseDocumentWithKey(oldSourceFile.resolvedPath, oldSettingsKey, oldSourceFile.scriptKind, oldSourceFile.impliedNodeFormat);
                }