function getTypeOfNode(node) {
                if (isSourceFile(node) && !isExternalModule(node)) {
                    return errorType;
                }
                if (node.flags & 33554432 /* InWithStatement */) {
                    return errorType;
                }
                const classDecl = tryGetClassImplementingOrExtendingExpressionWithTypeArguments(node);
                const classType = classDecl && getDeclaredTypeOfClassOrInterface(getSymbolOfDeclaration(classDecl.class));
                if (isPartOfTypeNode(node)) {
                    const typeFromTypeNode = getTypeFromTypeNode(node);
                    return classType ? getTypeWithThisArgument(typeFromTypeNode, classType.thisType) : typeFromTypeNode;
                }
                if (isExpressionNode(node)) {
                    return getRegularTypeOfExpression(node);
                }
                if (classType && !classDecl.isImplements) {
                    const baseType = firstOrUndefined(getBaseTypes(classType));
                    return baseType ? getTypeWithThisArgument(baseType, classType.thisType) : errorType;
                }
                if (isTypeDeclaration(node)) {
                    const symbol = getSymbolOfDeclaration(node);
                    return getDeclaredTypeOfSymbol(symbol);
                }
                if (isTypeDeclarationName(node)) {
                    const symbol = getSymbolAtLocation(node);
                    return symbol ? getDeclaredTypeOfSymbol(symbol) : errorType;
                }
                if (isDeclaration(node)) {
                    const symbol = getSymbolOfDeclaration(node);
                    return symbol ? getTypeOfSymbol(symbol) : errorType;
                }
                if (isDeclarationNameOrImportPropertyName(node)) {
                    const symbol = getSymbolAtLocation(node);
                    if (symbol) {
                        return getTypeOfSymbol(symbol);
                    }
                    return errorType;
                }
                if (isBindingPattern(node)) {
                    return getTypeForVariableLikeDeclaration(node.parent, 
                    /*includeOptionality*/
                    true, 0 /* Normal */) || errorType;
                }
                if (isInRightSideOfImportOrExportAssignment(node)) {
                    const symbol = getSymbolAtLocation(node);
                    if (symbol) {
                        const declaredType = getDeclaredTypeOfSymbol(symbol);
                        return !isErrorType(declaredType) ? declaredType : getTypeOfSymbol(symbol);
                    }
                }
                if (isMetaProperty(node.parent) && node.parent.keywordToken === node.kind) {
                    return checkMetaPropertyKeyword(node.parent);
                }
                return errorType;
            }