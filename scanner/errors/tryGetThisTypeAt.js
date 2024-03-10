function tryGetThisTypeAt(node, includeGlobalThis = true, container = getThisContainer(node, 
            /*includeArrowFunctions*/
            false, 
            /*includeClassComputedPropertyName*/
            false)) {
                const isInJS = isInJSFile(node);
                if (isFunctionLike(container) && (!isInParameterInitializerBeforeContainingFunction(node) || getThisParameter(container))) {
                    let thisType = getThisTypeOfDeclaration(container) || isInJS && getTypeForThisExpressionFromJSDoc(container);
                    if (!thisType) {
                        const className = getClassNameFromPrototypeMethod(container);
                        if (isInJS && className) {
                            const classSymbol = checkExpression(className).symbol;
                            if (classSymbol && classSymbol.members && classSymbol.flags & 16 /* Function */) {
                                thisType = getDeclaredTypeOfSymbol(classSymbol).thisType;
                            }
                        }
                        else if (isJSConstructor(container)) {
                            thisType = getDeclaredTypeOfSymbol(getMergedSymbol(container.symbol)).thisType;
                        }
                        thisType || (thisType = getContextualThisParameterType(container));
                    }
                    if (thisType) {
                        return getFlowTypeOfReference(node, thisType);
                    }
                }
                if (isClassLike(container.parent)) {
                    const symbol = getSymbolOfDeclaration(container.parent);
                    const type = isStatic(container) ? getTypeOfSymbol(symbol) : getDeclaredTypeOfSymbol(symbol).thisType;
                    return getFlowTypeOfReference(node, type);
                }
                if (isSourceFile(container)) {
                    if (container.commonJsModuleIndicator) {
                        const fileSymbol = getSymbolOfDeclaration(container);
                        return fileSymbol && getTypeOfSymbol(fileSymbol);
                    }
                    else if (container.externalModuleIndicator) {
                        return undefinedType;
                    }
                    else if (includeGlobalThis) {
                        return getTypeOfSymbol(globalThisSymbol);
                    }
                }
            }