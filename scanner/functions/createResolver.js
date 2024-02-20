function createResolver() {
                const resolvedTypeReferenceDirectives = host.getResolvedTypeReferenceDirectives();
                let fileToDirective;
                if (resolvedTypeReferenceDirectives) {
                    fileToDirective = /* @__PURE__ */ new Map();
                    resolvedTypeReferenceDirectives.forEach(({ resolvedTypeReferenceDirective }, key, mode) => {
                        if (!(resolvedTypeReferenceDirective == null ? void 0 : resolvedTypeReferenceDirective.resolvedFileName)) {
                            return;
                        }
                        const file = host.getSourceFile(resolvedTypeReferenceDirective.resolvedFileName);
                        if (file) {
                            addReferencedFilesToTypeDirective(file, key, mode);
                        }
                    });
                }
                return {
                    getReferencedExportContainer,
                    getReferencedImportDeclaration,
                    getReferencedDeclarationWithCollidingName,
                    isDeclarationWithCollidingName,
                    isValueAliasDeclaration: (nodeIn) => {
                        const node = getParseTreeNode(nodeIn);
                        return node ? isValueAliasDeclaration(node) : true;
                    },
                    hasGlobalName,
                    isReferencedAliasDeclaration: (nodeIn, checkChildren) => {
                        const node = getParseTreeNode(nodeIn);
                        return node ? isReferencedAliasDeclaration(node, checkChildren) : true;
                    },
                    getNodeCheckFlags: (nodeIn) => {
                        const node = getParseTreeNode(nodeIn);
                        return node ? getNodeCheckFlags(node) : 0;
                    },
                    isTopLevelValueImportEqualsWithEntityName,
                    isDeclarationVisible,
                    isImplementationOfOverload,
                    isRequiredInitializedParameter,
                    isOptionalUninitializedParameterProperty,
                    isExpandoFunctionDeclaration,
                    getPropertiesOfContainerFunction,
                    createTypeOfDeclaration,
                    createReturnTypeOfSignatureDeclaration,
                    createTypeOfExpression,
                    createLiteralConstValue,
                    isSymbolAccessible,
                    isEntityNameVisible,
                    getConstantValue: (nodeIn) => {
                        const node = getParseTreeNode(nodeIn, canHaveConstantValue);
                        return node ? getConstantValue2(node) : void 0;
                    },
                    collectLinkedAliases,
                    getReferencedValueDeclaration,
                    getTypeReferenceSerializationKind,
                    isOptionalParameter,
                    moduleExportsSomeValue,
                    isArgumentsLocalBinding,
                    getExternalModuleFileFromDeclaration: (nodeIn) => {
                        const node = getParseTreeNode(nodeIn, hasPossibleExternalModuleReference);
                        return node && getExternalModuleFileFromDeclaration(node);
                    },
                    getTypeReferenceDirectivesForEntityName,
                    getTypeReferenceDirectivesForSymbol,
                    isLiteralConstDeclaration,
                    isLateBound: (nodeIn) => {
                        const node = getParseTreeNode(nodeIn, isDeclaration);
                        const symbol = node && getSymbolOfDeclaration(node);
                        return !!(symbol && getCheckFlags(symbol) & 4096 /* Late */);
                    },
                    getJsxFactoryEntity,
                    getJsxFragmentFactoryEntity,
                    getAllAccessorDeclarations(accessor) {
                        accessor = getParseTreeNode(accessor, isGetOrSetAccessorDeclaration);
                        const otherKind = accessor.kind === 175 /* SetAccessor */ ? 174 /* GetAccessor */ : 175 /* SetAccessor */;
                        const otherAccessor = getDeclarationOfKind(getSymbolOfDeclaration(accessor), otherKind);
                        const firstAccessor = otherAccessor && otherAccessor.pos < accessor.pos ? otherAccessor : accessor;
                        const secondAccessor = otherAccessor && otherAccessor.pos < accessor.pos ? accessor : otherAccessor;
                        const setAccessor = accessor.kind === 175 /* SetAccessor */ ? accessor : otherAccessor;
                        const getAccessor = accessor.kind === 174 /* GetAccessor */ ? accessor : otherAccessor;
                        return {
                            firstAccessor,
                            secondAccessor,
                            setAccessor,
                            getAccessor
                        };
                    },
                    getSymbolOfExternalModuleSpecifier: (moduleName) => resolveExternalModuleNameWorker(moduleName, moduleName, 
                    /*moduleNotFoundError*/
                    void 0),
                    isBindingCapturedByNode: (node, decl) => {
                        const parseNode = getParseTreeNode(node);
                        const parseDecl = getParseTreeNode(decl);
                        return !!parseNode && !!parseDecl && (isVariableDeclaration(parseDecl) || isBindingElement(parseDecl)) && isBindingCapturedByNode(parseNode, parseDecl);
                    },
                    getDeclarationStatementsForSourceFile: (node, flags, tracker, bundled) => {
                        const n = getParseTreeNode(node);
                        Debug.assert(n && n.kind === 308 /* SourceFile */, "Non-sourcefile node passed into getDeclarationsForSourceFile");
                        const sym = getSymbolOfDeclaration(node);
                        if (!sym) {
                            return !node.locals ? [] : nodeBuilder.symbolTableToDeclarationStatements(node.locals, node, flags, tracker, bundled);
                        }
                        return !sym.exports ? [] : nodeBuilder.symbolTableToDeclarationStatements(sym.exports, node, flags, tracker, bundled);
                    },
                    isImportRequiredByAugmentation
                };
                function isImportRequiredByAugmentation(node) {
                    const file = getSourceFileOfNode(node);
                    if (!file.symbol)
                        return false;
                    const importTarget = getExternalModuleFileFromDeclaration(node);
                    if (!importTarget)
                        return false;
                    if (importTarget === file)
                        return false;
                    const exports = getExportsOfModule(file.symbol);
                    for (const s of arrayFrom(exports.values())) {
                        if (s.mergeId) {
                            const merged = getMergedSymbol(s);
                            if (merged.declarations) {
                                for (const d of merged.declarations) {
                                    const declFile = getSourceFileOfNode(d);
                                    if (declFile === importTarget) {
                                        return true;
                                    }
                                }
                            }
                        }
                    }
                    return false;
                }
                function isInHeritageClause(node) {
                    return node.parent && node.parent.kind === 230 /* ExpressionWithTypeArguments */ && node.parent.parent && node.parent.parent.kind === 294 /* HeritageClause */;
                }
                function getTypeReferenceDirectivesForEntityName(node) {
                    if (!fileToDirective) {
                        return void 0;
                    }
                    let meaning;
                    if (node.parent.kind === 164 /* ComputedPropertyName */) {
                        meaning = 111551 /* Value */ | 1048576 /* ExportValue */;
                    }
                    else {
                        meaning = 788968 /* Type */ | 1920 /* Namespace */;
                        if (node.kind === 79 /* Identifier */ && isInTypeQuery(node) || node.kind === 208 /* PropertyAccessExpression */ && !isInHeritageClause(node)) {
                            meaning = 111551 /* Value */ | 1048576 /* ExportValue */;
                        }
                    }
                    const symbol = resolveEntityName(node, meaning, 
                    /*ignoreErrors*/
                    true);
                    return symbol && symbol !== unknownSymbol ? getTypeReferenceDirectivesForSymbol(symbol, meaning) : void 0;
                }
                function getTypeReferenceDirectivesForSymbol(symbol, meaning) {
                    if (!fileToDirective || !isSymbolFromTypeDeclarationFile(symbol)) {
                        return void 0;
                    }
                    let typeReferenceDirectives;
                    for (const decl of symbol.declarations) {
                        if (decl.symbol && decl.symbol.flags & meaning) {
                            const file = getSourceFileOfNode(decl);
                            const typeReferenceDirective = fileToDirective.get(file.path);
                            if (typeReferenceDirective) {
                                (typeReferenceDirectives || (typeReferenceDirectives = [])).push(typeReferenceDirective);
                            }
                            else {
                                return void 0;
                            }
                        }
                    }
                    return typeReferenceDirectives;
                }
                function isSymbolFromTypeDeclarationFile(symbol) {
                    if (!symbol.declarations) {
                        return false;
                    }
                    let current = symbol;
                    while (true) {
                        const parent2 = getParentOfSymbol(current);
                        if (parent2) {
                            current = parent2;
                        }
                        else {
                            break;
                        }
                    }
                    if (current.valueDeclaration && current.valueDeclaration.kind === 308 /* SourceFile */ && current.flags & 512 /* ValueModule */) {
                        return false;
                    }
                    for (const decl of symbol.declarations) {
                        const file = getSourceFileOfNode(decl);
                        if (fileToDirective.has(file.path)) {
                            return true;
                        }
                    }
                    return false;
                }
                function addReferencedFilesToTypeDirective(file, key, mode) {
                    if (fileToDirective.has(file.path))
                        return;
                    fileToDirective.set(file.path, [key, mode]);
                    for (const { fileName, resolutionMode } of file.referencedFiles) {
                        const resolvedFile = resolveTripleslashReference(fileName, file.fileName);
                        const referencedFile = host.getSourceFile(resolvedFile);
                        if (referencedFile) {
                            addReferencedFilesToTypeDirective(referencedFile, key, resolutionMode || file.impliedNodeFormat);
                        }
                    }
                }
            }