function getRenameInfoForModule(node, sourceFile, moduleSymbol) {
            if (!isExternalModuleNameRelative(node.text)) {
                return getRenameInfoError(Diagnostics.You_cannot_rename_a_module_via_a_global_import);
            }
            const moduleSourceFile = moduleSymbol.declarations && find(moduleSymbol.declarations, isSourceFile);
            if (!moduleSourceFile)
                return void 0;
            const withoutIndex = endsWith(node.text, "/index") || endsWith(node.text, "/index.js") ? void 0 : tryRemoveSuffix(removeFileExtension(moduleSourceFile.fileName), "/index");
            const name = withoutIndex === void 0 ? moduleSourceFile.fileName : withoutIndex;
            const kind = withoutIndex === void 0 ? "module" /* moduleElement */ : "directory" /* directory */;
            const indexAfterLastSlash = node.text.lastIndexOf("/") + 1;
            const triggerSpan = createTextSpan(node.getStart(sourceFile) + 1 + indexAfterLastSlash, node.text.length - indexAfterLastSlash);
            return {
                canRename: true,
                fileToRename: name,
                kind,
                displayName: name,
                fullDisplayName: name,
                kindModifiers: "" /* none */,
                triggerSpan
            };
        }