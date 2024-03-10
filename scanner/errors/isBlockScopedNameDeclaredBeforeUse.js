function isBlockScopedNameDeclaredBeforeUse(declaration, usage) {
                const declarationFile = getSourceFileOfNode(declaration);
                const useFile = getSourceFileOfNode(usage);
                const declContainer = getEnclosingBlockScopeContainer(declaration);
                if (declarationFile !== useFile) {
                    if (moduleKind && (declarationFile.externalModuleIndicator || useFile.externalModuleIndicator) || !outFile(compilerOptions) || isInTypeQuery(usage) || declaration.flags & 16777216 /* Ambient */) {
                        return true;
                    }
                    if (isUsedInFunctionOrInstanceProperty(usage, declaration)) {
                        return true;
                    }
                    const sourceFiles = host.getSourceFiles();
                    return sourceFiles.indexOf(declarationFile) <= sourceFiles.indexOf(useFile);
                }
                if (declaration.pos <= usage.pos && !(isPropertyDeclaration(declaration) && isThisProperty(usage.parent) && !declaration.initializer && !declaration.exclamationToken)) {
                    if (declaration.kind === 205 /* BindingElement */) {
                        const errorBindingElement = getAncestor(usage, 205 /* BindingElement */);
                        if (errorBindingElement) {
                            return findAncestor(errorBindingElement, isBindingElement) !== findAncestor(declaration, isBindingElement) || declaration.pos < errorBindingElement.pos;
                        }
                        return isBlockScopedNameDeclaredBeforeUse(getAncestor(declaration, 257 /* VariableDeclaration */), usage);
                    }
                    else if (declaration.kind === 257 /* VariableDeclaration */) {
                        return !isImmediatelyUsedInInitializerOfBlockScopedVariable(declaration, usage);
                    }
                    else if (isClassDeclaration(declaration)) {
                        return !findAncestor(usage, (n) => isComputedPropertyName(n) && n.parent.parent === declaration);
                    }
                    else if (isPropertyDeclaration(declaration)) {
                        return !isPropertyImmediatelyReferencedWithinDeclaration(declaration, usage, 
                        /*stopAtAnyPropertyDeclaration*/
                        false);
                    }
                    else if (isParameterPropertyDeclaration(declaration, declaration.parent)) {
                        return !(getEmitScriptTarget(compilerOptions) === 99 /* ESNext */ && useDefineForClassFields && getContainingClass(declaration) === getContainingClass(usage) && isUsedInFunctionOrInstanceProperty(usage, declaration));
                    }
                    return true;
                }
                if (usage.parent.kind === 278 /* ExportSpecifier */ || usage.parent.kind === 274 /* ExportAssignment */ && usage.parent.isExportEquals) {
                    return true;
                }
                if (usage.kind === 274 /* ExportAssignment */ && usage.isExportEquals) {
                    return true;
                }
                if (!!(usage.flags & 8388608 /* JSDoc */) || isInTypeQuery(usage) || isInAmbientOrTypeNode(usage)) {
                    return true;
                }
                if (isUsedInFunctionOrInstanceProperty(usage, declaration)) {
                    if (getEmitScriptTarget(compilerOptions) === 99 /* ESNext */ && useDefineForClassFields && getContainingClass(declaration) && (isPropertyDeclaration(declaration) || isParameterPropertyDeclaration(declaration, declaration.parent))) {
                        return !isPropertyImmediatelyReferencedWithinDeclaration(declaration, usage, 
                        /*stopAtAnyPropertyDeclaration*/
                        true);
                    }
                    else {
                        return true;
                    }
                }
                return false;
                function isImmediatelyUsedInInitializerOfBlockScopedVariable(declaration2, usage2) {
                    switch (declaration2.parent.parent.kind) {
                        case 240 /* VariableStatement */:
                        case 245 /* ForStatement */:
                        case 247 /* ForOfStatement */:
                            if (isSameScopeDescendentOf(usage2, declaration2, declContainer)) {
                                return true;
                            }
                            break;
                    }
                    const grandparent = declaration2.parent.parent;
                    return isForInOrOfStatement(grandparent) && isSameScopeDescendentOf(usage2, grandparent.expression, declContainer);
                }
                function isUsedInFunctionOrInstanceProperty(usage2, declaration2) {
                    return !!findAncestor(usage2, (current) => {
                        if (current === declContainer) {
                            return "quit";
                        }
                        if (isFunctionLike(current)) {
                            return true;
                        }
                        if (isClassStaticBlockDeclaration(current)) {
                            return declaration2.pos < usage2.pos;
                        }
                        const propertyDeclaration = tryCast(current.parent, isPropertyDeclaration);
                        if (propertyDeclaration) {
                            const initializerOfProperty = propertyDeclaration.initializer === current;
                            if (initializerOfProperty) {
                                if (isStatic(current.parent)) {
                                    if (declaration2.kind === 171 /* MethodDeclaration */) {
                                        return true;
                                    }
                                    if (isPropertyDeclaration(declaration2) && getContainingClass(usage2) === getContainingClass(declaration2)) {
                                        const propName = declaration2.name;
                                        if (isIdentifier(propName) || isPrivateIdentifier(propName)) {
                                            const type = getTypeOfSymbol(getSymbolOfDeclaration(declaration2));
                                            const staticBlocks = filter(declaration2.parent.members, isClassStaticBlockDeclaration);
                                            if (isPropertyInitializedInStaticBlocks(propName, type, staticBlocks, declaration2.parent.pos, current.pos)) {
                                                return true;
                                            }
                                        }
                                    }
                                }
                                else {
                                    const isDeclarationInstanceProperty = declaration2.kind === 169 /* PropertyDeclaration */ && !isStatic(declaration2);
                                    if (!isDeclarationInstanceProperty || getContainingClass(usage2) !== getContainingClass(declaration2)) {
                                        return true;
                                    }
                                }
                            }
                        }
                        return false;
                    });
                }
                function isPropertyImmediatelyReferencedWithinDeclaration(declaration2, usage2, stopAtAnyPropertyDeclaration) {
                    if (usage2.end > declaration2.end) {
                        return false;
                    }
                    const ancestorChangingReferenceScope = findAncestor(usage2, (node) => {
                        if (node === declaration2) {
                            return "quit";
                        }
                        switch (node.kind) {
                            case 216 /* ArrowFunction */:
                                return true;
                            case 169 /* PropertyDeclaration */:
                                return stopAtAnyPropertyDeclaration && (isPropertyDeclaration(declaration2) && node.parent === declaration2.parent || isParameterPropertyDeclaration(declaration2, declaration2.parent) && node.parent === declaration2.parent.parent) ? "quit" : true;
                            case 238 /* Block */:
                                switch (node.parent.kind) {
                                    case 174 /* GetAccessor */:
                                    case 171 /* MethodDeclaration */:
                                    case 175 /* SetAccessor */:
                                        return true;
                                    default:
                                        return false;
                                }
                            default:
                                return false;
                        }
                    });
                    return ancestorChangingReferenceScope === void 0;
                }
            }