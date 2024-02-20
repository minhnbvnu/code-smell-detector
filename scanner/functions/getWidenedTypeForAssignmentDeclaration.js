function getWidenedTypeForAssignmentDeclaration(symbol, resolvedSymbol) {
                const container = getAssignedExpandoInitializer(symbol.valueDeclaration);
                if (container) {
                    const tag = isInJSFile(container) ? getJSDocTypeTag(container) : void 0;
                    if (tag && tag.typeExpression) {
                        return getTypeFromTypeNode(tag.typeExpression);
                    }
                    const containerObjectType = symbol.valueDeclaration && getJSContainerObjectType(symbol.valueDeclaration, symbol, container);
                    return containerObjectType || getWidenedLiteralType(checkExpressionCached(container));
                }
                let type;
                let definedInConstructor = false;
                let definedInMethod = false;
                if (isConstructorDeclaredProperty(symbol)) {
                    type = getFlowTypeInConstructor(symbol, getDeclaringConstructor(symbol));
                }
                if (!type) {
                    let types;
                    if (symbol.declarations) {
                        let jsdocType;
                        for (const declaration of symbol.declarations) {
                            const expression = isBinaryExpression(declaration) || isCallExpression(declaration) ? declaration : isAccessExpression(declaration) ? isBinaryExpression(declaration.parent) ? declaration.parent : declaration : void 0;
                            if (!expression) {
                                continue;
                            }
                            const kind = isAccessExpression(expression) ? getAssignmentDeclarationPropertyAccessKind(expression) : getAssignmentDeclarationKind(expression);
                            if (kind === 4 /* ThisProperty */ || isBinaryExpression(expression) && isPossiblyAliasedThisProperty(expression, kind)) {
                                if (isDeclarationInConstructor(expression)) {
                                    definedInConstructor = true;
                                }
                                else {
                                    definedInMethod = true;
                                }
                            }
                            if (!isCallExpression(expression)) {
                                jsdocType = getAnnotatedTypeForAssignmentDeclaration(jsdocType, expression, symbol, declaration);
                            }
                            if (!jsdocType) {
                                (types || (types = [])).push(isBinaryExpression(expression) || isCallExpression(expression) ? getInitializerTypeFromAssignmentDeclaration(symbol, resolvedSymbol, expression, kind) : neverType);
                            }
                        }
                        type = jsdocType;
                    }
                    if (!type) {
                        if (!length(types)) {
                            return errorType;
                        }
                        let constructorTypes = definedInConstructor && symbol.declarations ? getConstructorDefinedThisAssignmentTypes(types, symbol.declarations) : void 0;
                        if (definedInMethod) {
                            const propType = getTypeOfPropertyInBaseClass(symbol);
                            if (propType) {
                                (constructorTypes || (constructorTypes = [])).push(propType);
                                definedInConstructor = true;
                            }
                        }
                        const sourceTypes = some(constructorTypes, (t) => !!(t.flags & ~98304 /* Nullable */)) ? constructorTypes : types;
                        type = getUnionType(sourceTypes);
                    }
                }
                const widened = getWidenedType(addOptionality(type, 
                /*isProperty*/
                false, definedInMethod && !definedInConstructor));
                if (symbol.valueDeclaration && filterType(widened, (t) => !!(t.flags & ~98304 /* Nullable */)) === neverType) {
                    reportImplicitAny(symbol.valueDeclaration, anyType);
                    return anyType;
                }
                return widened;
            }