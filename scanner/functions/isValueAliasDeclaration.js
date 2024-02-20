function isValueAliasDeclaration(node) {
                Debug.assert(!compilerOptions.verbatimModuleSyntax);
                switch (node.kind) {
                    case 268 /* ImportEqualsDeclaration */:
                        return isAliasResolvedToValue(getSymbolOfDeclaration(node));
                    case 270 /* ImportClause */:
                    case 271 /* NamespaceImport */:
                    case 273 /* ImportSpecifier */:
                    case 278 /* ExportSpecifier */:
                        const symbol = getSymbolOfDeclaration(node);
                        return !!symbol && isAliasResolvedToValue(symbol) && !getTypeOnlyAliasDeclaration(symbol, 111551 /* Value */);
                    case 275 /* ExportDeclaration */:
                        const exportClause = node.exportClause;
                        return !!exportClause && (isNamespaceExport(exportClause) || some(exportClause.elements, isValueAliasDeclaration));
                    case 274 /* ExportAssignment */:
                        return node.expression && node.expression.kind === 79 /* Identifier */ ? isAliasResolvedToValue(getSymbolOfDeclaration(node)) : true;
                }
                return false;
            }