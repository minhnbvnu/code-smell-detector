function getRenameInfoForNode(node, typeChecker, sourceFile, program, preferences) {
            const symbol = typeChecker.getSymbolAtLocation(node);
            if (!symbol) {
                if (isStringLiteralLike(node)) {
                    const type = getContextualTypeFromParentOrAncestorTypeNode(node, typeChecker);
                    if (type && (type.flags & 128 /* StringLiteral */ || type.flags & 1048576 /* Union */ && every(type.types, (type2) => !!(type2.flags & 128 /* StringLiteral */)))) {
                        return getRenameInfoSuccess(node.text, node.text, "string" /* string */, "", node, sourceFile);
                    }
                }
                else if (isLabelName(node)) {
                    const name = getTextOfNode(node);
                    return getRenameInfoSuccess(name, name, "label" /* label */, "" /* none */, node, sourceFile);
                }
                return void 0;
            }
            const { declarations } = symbol;
            if (!declarations || declarations.length === 0)
                return;
            if (declarations.some((declaration) => isDefinedInLibraryFile(program, declaration))) {
                return getRenameInfoError(Diagnostics.You_cannot_rename_elements_that_are_defined_in_the_standard_TypeScript_library);
            }
            if (isIdentifier(node) && node.escapedText === "default" && symbol.parent && symbol.parent.flags & 1536 /* Module */) {
                return void 0;
            }
            if (isStringLiteralLike(node) && tryGetImportFromModuleSpecifier(node)) {
                return preferences.allowRenameOfImportPath ? getRenameInfoForModule(node, sourceFile, symbol) : void 0;
            }
            const wouldRenameNodeModules = wouldRenameInOtherNodeModules(sourceFile, symbol, typeChecker, preferences);
            if (wouldRenameNodeModules) {
                return getRenameInfoError(wouldRenameNodeModules);
            }
            const kind = ts_SymbolDisplay_exports.getSymbolKind(typeChecker, symbol, node);
            const specifierName = isImportOrExportSpecifierName(node) || isStringOrNumericLiteralLike(node) && node.parent.kind === 164 /* ComputedPropertyName */ ? stripQuotes(getTextOfIdentifierOrLiteral(node)) : void 0;
            const displayName = specifierName || typeChecker.symbolToString(symbol);
            const fullDisplayName = specifierName || typeChecker.getFullyQualifiedName(symbol);
            return getRenameInfoSuccess(displayName, fullDisplayName, kind, ts_SymbolDisplay_exports.getSymbolModifiers(typeChecker, symbol), node, sourceFile);
        }