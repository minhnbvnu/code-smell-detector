function doChange27(changes, sourceFile, info, preferences) {
            changes.replaceNode(sourceFile, info.importNode, makeImport(info.name, 
            /*namedImports*/
            void 0, info.moduleSpecifier, getQuotePreference(sourceFile, preferences)));
        }