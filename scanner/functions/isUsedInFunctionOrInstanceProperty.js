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