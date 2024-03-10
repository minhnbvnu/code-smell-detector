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