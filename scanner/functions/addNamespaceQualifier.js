function addNamespaceQualifier(changes, sourceFile, { namespacePrefix, usagePosition }) {
            changes.insertText(sourceFile, usagePosition, namespacePrefix + ".");
        }