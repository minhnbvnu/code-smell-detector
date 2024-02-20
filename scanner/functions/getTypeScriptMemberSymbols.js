function getTypeScriptMemberSymbols() {
                completionKind = 2 /* PropertyAccess */;
                const isImportType = isLiteralImportTypeNode(node);
                const isTypeLocation = insideJsDocTagTypeExpression || isImportType && !node.isTypeOf || isPartOfTypeNode(node.parent) || isPossiblyTypeArgumentPosition(contextToken, sourceFile, typeChecker);
                const isRhsOfImportDeclaration = isInRightSideOfInternalImportEqualsDeclaration(node);
                if (isEntityName(node) || isImportType || isPropertyAccessExpression(node)) {
                    const isNamespaceName = isModuleDeclaration(node.parent);
                    if (isNamespaceName)
                        isNewIdentifierLocation = true;
                    let symbol = typeChecker.getSymbolAtLocation(node);
                    if (symbol) {
                        symbol = skipAlias(symbol, typeChecker);
                        if (symbol.flags & (1536 /* Module */ | 384 /* Enum */)) {
                            const exportedSymbols = typeChecker.getExportsOfModule(symbol);
                            Debug.assertEachIsDefined(exportedSymbols, "getExportsOfModule() should all be defined");
                            const isValidValueAccess = (symbol2) => typeChecker.isValidPropertyAccess(isImportType ? node : node.parent, symbol2.name);
                            const isValidTypeAccess = (symbol2) => symbolCanBeReferencedAtTypeLocation(symbol2, typeChecker);
                            const isValidAccess = isNamespaceName ? (symbol2) => {
                                var _a2;
                                return !!(symbol2.flags & 1920 /* Namespace */) && !((_a2 = symbol2.declarations) == null ? void 0 : _a2.every((d) => d.parent === node.parent));
                            } : isRhsOfImportDeclaration ? (
                            // Any kind is allowed when dotting off namespace in internal import equals declaration
                            (symbol2) => isValidTypeAccess(symbol2) || isValidValueAccess(symbol2)) : isTypeLocation ? isValidTypeAccess : isValidValueAccess;
                            for (const exportedSymbol of exportedSymbols) {
                                if (isValidAccess(exportedSymbol)) {
                                    symbols.push(exportedSymbol);
                                }
                            }
                            if (!isTypeLocation && symbol.declarations && symbol.declarations.some((d) => d.kind !== 308 /* SourceFile */ && d.kind !== 264 /* ModuleDeclaration */ && d.kind !== 263 /* EnumDeclaration */)) {
                                let type = typeChecker.getTypeOfSymbolAtLocation(symbol, node).getNonOptionalType();
                                let insertQuestionDot = false;
                                if (type.isNullableType()) {
                                    const canCorrectToQuestionDot = isRightOfDot && !isRightOfQuestionDot && preferences.includeAutomaticOptionalChainCompletions !== false;
                                    if (canCorrectToQuestionDot || isRightOfQuestionDot) {
                                        type = type.getNonNullableType();
                                        if (canCorrectToQuestionDot) {
                                            insertQuestionDot = true;
                                        }
                                    }
                                }
                                addTypeProperties(type, !!(node.flags & 32768 /* AwaitContext */), insertQuestionDot);
                            }
                            return;
                        }
                    }
                }
                if (!isTypeLocation) {
                    typeChecker.tryGetThisTypeAt(node, 
                    /*includeGlobalThis*/
                    false);
                    let type = typeChecker.getTypeAtLocation(node).getNonOptionalType();
                    let insertQuestionDot = false;
                    if (type.isNullableType()) {
                        const canCorrectToQuestionDot = isRightOfDot && !isRightOfQuestionDot && preferences.includeAutomaticOptionalChainCompletions !== false;
                        if (canCorrectToQuestionDot || isRightOfQuestionDot) {
                            type = type.getNonNullableType();
                            if (canCorrectToQuestionDot) {
                                insertQuestionDot = true;
                            }
                        }
                    }
                    addTypeProperties(type, !!(node.flags & 32768 /* AwaitContext */), insertQuestionDot);
                }
            }