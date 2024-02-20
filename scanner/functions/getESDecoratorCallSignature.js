function getESDecoratorCallSignature(decorator) {
                const { parent: parent2 } = decorator;
                const links = getNodeLinks(parent2);
                if (!links.decoratorSignature) {
                    links.decoratorSignature = anySignature;
                    switch (parent2.kind) {
                        case 260 /* ClassDeclaration */:
                        case 228 /* ClassExpression */: {
                            const node = parent2;
                            const targetType = getTypeOfSymbol(getSymbolOfDeclaration(node));
                            const contextType = createClassDecoratorContextType(targetType);
                            links.decoratorSignature = createESDecoratorCallSignature(targetType, contextType, targetType);
                            break;
                        }
                        case 171 /* MethodDeclaration */:
                        case 174 /* GetAccessor */:
                        case 175 /* SetAccessor */: {
                            const node = parent2;
                            if (!isClassLike(node.parent))
                                break;
                            const valueType = isMethodDeclaration(node) ? getOrCreateTypeFromSignature(getSignatureFromDeclaration(node)) : getTypeOfNode(node);
                            const thisType = hasStaticModifier(node) ? getTypeOfSymbol(getSymbolOfDeclaration(node.parent)) : getDeclaredTypeOfClassOrInterface(getSymbolOfDeclaration(node.parent));
                            const targetType = isGetAccessorDeclaration(node) ? createGetterFunctionType(valueType) : isSetAccessorDeclaration(node) ? createSetterFunctionType(valueType) : valueType;
                            const contextType = createClassMemberDecoratorContextTypeForNode(node, thisType, valueType);
                            const returnType = isGetAccessorDeclaration(node) ? createGetterFunctionType(valueType) : isSetAccessorDeclaration(node) ? createSetterFunctionType(valueType) : valueType;
                            links.decoratorSignature = createESDecoratorCallSignature(targetType, contextType, returnType);
                            break;
                        }
                        case 169 /* PropertyDeclaration */: {
                            const node = parent2;
                            if (!isClassLike(node.parent))
                                break;
                            const valueType = getTypeOfNode(node);
                            const thisType = hasStaticModifier(node) ? getTypeOfSymbol(getSymbolOfDeclaration(node.parent)) : getDeclaredTypeOfClassOrInterface(getSymbolOfDeclaration(node.parent));
                            const targetType = hasAccessorModifier(node) ? createClassAccessorDecoratorTargetType(thisType, valueType) : undefinedType;
                            const contextType = createClassMemberDecoratorContextTypeForNode(node, thisType, valueType);
                            const returnType = hasAccessorModifier(node) ? createClassAccessorDecoratorResultType(thisType, valueType) : createClassFieldDecoratorInitializerMutatorType(thisType, valueType);
                            links.decoratorSignature = createESDecoratorCallSignature(targetType, contextType, returnType);
                            break;
                        }
                    }
                }
                return links.decoratorSignature === anySignature ? void 0 : links.decoratorSignature;
            }