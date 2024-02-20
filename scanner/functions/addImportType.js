function addImportType(changes, sourceFile, { moduleSpecifier, usagePosition: position }, quotePreference) {
            changes.insertText(sourceFile, position, getImportTypePrefix(moduleSpecifier, quotePreference));
        }