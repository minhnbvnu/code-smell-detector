function handleNamespaceImportLike(importName) {
                if (exportKind === 2 /* ExportEquals */ && (!isForRename || isNameMatch(importName.escapedText))) {
                    addSearch(importName, checker.getSymbolAtLocation(importName));
                }
            }