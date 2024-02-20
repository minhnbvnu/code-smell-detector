function checkExportsOnMergedDeclarationsWorker(node) {
                let symbol = node.localSymbol;
                if (!symbol) {
                    symbol = getSymbolOfDeclaration(node);
                    if (!symbol.exportSymbol) {
                        return;
                    }
                }
                if (getDeclarationOfKind(symbol, node.kind) !== node) {
                    return;
                }
                let exportedDeclarationSpaces = 0 /* None */;
                let nonExportedDeclarationSpaces = 0 /* None */;
                let defaultExportedDeclarationSpaces = 0 /* None */;
                for (const d of symbol.declarations) {
                    const declarationSpaces = getDeclarationSpaces(d);
                    const effectiveDeclarationFlags = getEffectiveDeclarationFlags(d, 1 /* Export */ | 1024 /* Default */);
                    if (effectiveDeclarationFlags & 1 /* Export */) {
                        if (effectiveDeclarationFlags & 1024 /* Default */) {
                            defaultExportedDeclarationSpaces |= declarationSpaces;
                        }
                        else {
                            exportedDeclarationSpaces |= declarationSpaces;
                        }
                    }
                    else {
                        nonExportedDeclarationSpaces |= declarationSpaces;
                    }
                }
                const nonDefaultExportedDeclarationSpaces = exportedDeclarationSpaces | nonExportedDeclarationSpaces;
                const commonDeclarationSpacesForExportsAndLocals = exportedDeclarationSpaces & nonExportedDeclarationSpaces;
                const commonDeclarationSpacesForDefaultAndNonDefault = defaultExportedDeclarationSpaces & nonDefaultExportedDeclarationSpaces;
                if (commonDeclarationSpacesForExportsAndLocals || commonDeclarationSpacesForDefaultAndNonDefault) {
                    for (const d of symbol.declarations) {
                        const declarationSpaces = getDeclarationSpaces(d);
                        const name = getNameOfDeclaration(d);
                        if (declarationSpaces & commonDeclarationSpacesForDefaultAndNonDefault) {
                            error(name, Diagnostics.Merged_declaration_0_cannot_include_a_default_export_declaration_Consider_adding_a_separate_export_default_0_declaration_instead, declarationNameToString(name));
                        }
                        else if (declarationSpaces & commonDeclarationSpacesForExportsAndLocals) {
                            error(name, Diagnostics.Individual_declarations_in_merged_declaration_0_must_be_all_exported_or_all_local, declarationNameToString(name));
                        }
                    }
                }
                function getDeclarationSpaces(decl) {
                    let d = decl;
                    switch (d.kind) {
                        case 261 /* InterfaceDeclaration */:
                        case 262 /* TypeAliasDeclaration */:
                        case 349 /* JSDocTypedefTag */:
                        case 341 /* JSDocCallbackTag */:
                        case 343 /* JSDocEnumTag */:
                            return 2 /* ExportType */;
                        case 264 /* ModuleDeclaration */:
                            return isAmbientModule(d) || getModuleInstanceState(d) !== 0 /* NonInstantiated */ ? 4 /* ExportNamespace */ | 1 /* ExportValue */ : 4 /* ExportNamespace */;
                        case 260 /* ClassDeclaration */:
                        case 263 /* EnumDeclaration */:
                        case 302 /* EnumMember */:
                            return 2 /* ExportType */ | 1 /* ExportValue */;
                        case 308 /* SourceFile */:
                            return 2 /* ExportType */ | 1 /* ExportValue */ | 4 /* ExportNamespace */;
                        case 274 /* ExportAssignment */:
                        case 223 /* BinaryExpression */:
                            const node2 = d;
                            const expression = isExportAssignment(node2) ? node2.expression : node2.right;
                            if (!isEntityNameExpression(expression)) {
                                return 1 /* ExportValue */;
                            }
                            d = expression;
                        case 268 /* ImportEqualsDeclaration */:
                        case 271 /* NamespaceImport */:
                        case 270 /* ImportClause */:
                            let result = 0 /* None */;
                            const target = resolveAlias(getSymbolOfDeclaration(d));
                            forEach(target.declarations, (d2) => {
                                result |= getDeclarationSpaces(d2);
                            });
                            return result;
                        case 257 /* VariableDeclaration */:
                        case 205 /* BindingElement */:
                        case 259 /* FunctionDeclaration */:
                        case 273 /* ImportSpecifier */:
                        case 79 /* Identifier */:
                            return 1 /* ExportValue */;
                        case 170 /* MethodSignature */:
                        case 168 /* PropertySignature */:
                            return 2 /* ExportType */;
                        default:
                            return Debug.failBadSyntaxKind(d);
                    }
                }
            }