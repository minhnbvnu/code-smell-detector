function parseDeclarationWorker(pos, hasJSDoc, modifiersIn) {
                        switch (token()) {
                            case 113 /* VarKeyword */:
                            case 119 /* LetKeyword */:
                            case 85 /* ConstKeyword */:
                                return parseVariableStatement(pos, hasJSDoc, modifiersIn);
                            case 98 /* FunctionKeyword */:
                                return parseFunctionDeclaration(pos, hasJSDoc, modifiersIn);
                            case 84 /* ClassKeyword */:
                                return parseClassDeclaration(pos, hasJSDoc, modifiersIn);
                            case 118 /* InterfaceKeyword */:
                                return parseInterfaceDeclaration(pos, hasJSDoc, modifiersIn);
                            case 154 /* TypeKeyword */:
                                return parseTypeAliasDeclaration(pos, hasJSDoc, modifiersIn);
                            case 92 /* EnumKeyword */:
                                return parseEnumDeclaration(pos, hasJSDoc, modifiersIn);
                            case 159 /* GlobalKeyword */:
                            case 142 /* ModuleKeyword */:
                            case 143 /* NamespaceKeyword */:
                                return parseModuleDeclaration(pos, hasJSDoc, modifiersIn);
                            case 100 /* ImportKeyword */:
                                return parseImportDeclarationOrImportEqualsDeclaration(pos, hasJSDoc, modifiersIn);
                            case 93 /* ExportKeyword */:
                                nextToken();
                                switch (token()) {
                                    case 88 /* DefaultKeyword */:
                                    case 63 /* EqualsToken */:
                                        return parseExportAssignment(pos, hasJSDoc, modifiersIn);
                                    case 128 /* AsKeyword */:
                                        return parseNamespaceExportDeclaration(pos, hasJSDoc, modifiersIn);
                                    default:
                                        return parseExportDeclaration(pos, hasJSDoc, modifiersIn);
                                }
                            default:
                                if (modifiersIn) {
                                    const missing = createMissingNode(279 /* MissingDeclaration */, 
                                    /*reportAtCurrentPosition*/
                                    true, Diagnostics.Declaration_expected);
                                    setTextRangePos(missing, pos);
                                    missing.modifiers = modifiersIn;
                                    return missing;
                                }
                                return void 0;
                        }
                    }