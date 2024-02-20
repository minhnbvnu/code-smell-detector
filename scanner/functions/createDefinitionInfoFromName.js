function createDefinitionInfoFromName(checker, declaration, symbolKind, symbolName2, containerName, unverified, failedAliasResolution, textSpan) {
            const sourceFile = declaration.getSourceFile();
            if (!textSpan) {
                const name = getNameOfDeclaration(declaration) || declaration;
                textSpan = createTextSpanFromNode(name, sourceFile);
            }
            return {
                fileName: sourceFile.fileName,
                textSpan,
                kind: symbolKind,
                name: symbolName2,
                containerKind: void 0,
                // TODO: GH#18217
                containerName,
                ...ts_FindAllReferences_exports.toContextSpan(textSpan, sourceFile, ts_FindAllReferences_exports.getContextNode(declaration)),
                isLocal: !isDefinitionVisible(checker, declaration),
                isAmbient: !!(declaration.flags & 16777216 /* Ambient */),
                unverified,
                failedAliasResolution
            };
        }