function getDocumentRegistryEntry(bucketEntry, scriptKind) {
                const entry = isDocumentRegistryEntry(bucketEntry) ? bucketEntry : bucketEntry.get(Debug.checkDefined(scriptKind, "If there are more than one scriptKind's for same document the scriptKind should be provided"));
                Debug.assert(scriptKind === void 0 || !entry || entry.sourceFile.scriptKind === scriptKind, `Script kind should match provided ScriptKind:${scriptKind} and sourceFile.scriptKind: ${entry == null ? void 0 : entry.sourceFile.scriptKind}, !entry: ${!entry}`);
                return entry;
            }