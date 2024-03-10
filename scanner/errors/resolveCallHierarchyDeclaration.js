function resolveCallHierarchyDeclaration(program, location) {
            const typeChecker = program.getTypeChecker();
            let followingSymbol = false;
            while (true) {
                if (isValidCallHierarchyDeclaration(location)) {
                    return findImplementationOrAllInitialDeclarations(typeChecker, location);
                }
                if (isPossibleCallHierarchyDeclaration(location)) {
                    const ancestor = findAncestor(location, isValidCallHierarchyDeclaration);
                    return ancestor && findImplementationOrAllInitialDeclarations(typeChecker, ancestor);
                }
                if (isDeclarationName(location)) {
                    if (isValidCallHierarchyDeclaration(location.parent)) {
                        return findImplementationOrAllInitialDeclarations(typeChecker, location.parent);
                    }
                    if (isPossibleCallHierarchyDeclaration(location.parent)) {
                        const ancestor = findAncestor(location.parent, isValidCallHierarchyDeclaration);
                        return ancestor && findImplementationOrAllInitialDeclarations(typeChecker, ancestor);
                    }
                    if (isVariableDeclaration(location.parent) && location.parent.initializer && isConstNamedExpression(location.parent.initializer)) {
                        return location.parent.initializer;
                    }
                    return void 0;
                }
                if (isConstructorDeclaration(location)) {
                    if (isValidCallHierarchyDeclaration(location.parent)) {
                        return location.parent;
                    }
                    return void 0;
                }
                if (location.kind === 124 /* StaticKeyword */ && isClassStaticBlockDeclaration(location.parent)) {
                    location = location.parent;
                    continue;
                }
                if (isVariableDeclaration(location) && location.initializer && isConstNamedExpression(location.initializer)) {
                    return location.initializer;
                }
                if (!followingSymbol) {
                    let symbol = typeChecker.getSymbolAtLocation(location);
                    if (symbol) {
                        if (symbol.flags & 2097152 /* Alias */) {
                            symbol = typeChecker.getAliasedSymbol(symbol);
                        }
                        if (symbol.valueDeclaration) {
                            followingSymbol = true;
                            location = symbol.valueDeclaration;
                            continue;
                        }
                    }
                }
                return void 0;
            }
        }