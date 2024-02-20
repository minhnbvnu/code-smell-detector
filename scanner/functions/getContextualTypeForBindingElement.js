function getContextualTypeForBindingElement(declaration, contextFlags) {
                const parent2 = declaration.parent.parent;
                const name = declaration.propertyName || declaration.name;
                const parentType = getContextualTypeForVariableLikeDeclaration(parent2, contextFlags) || parent2.kind !== 205 /* BindingElement */ && parent2.initializer && checkDeclarationInitializer(parent2, declaration.dotDotDotToken ? 64 /* RestBindingElement */ : 0 /* Normal */);
                if (!parentType || isBindingPattern(name) || isComputedNonLiteralName(name))
                    return void 0;
                if (parent2.name.kind === 204 /* ArrayBindingPattern */) {
                    const index = indexOfNode(declaration.parent.elements, declaration);
                    if (index < 0)
                        return void 0;
                    return getContextualTypeForElementExpression(parentType, index);
                }
                const nameType = getLiteralTypeFromPropertyName(name);
                if (isTypeUsableAsPropertyName(nameType)) {
                    const text = getPropertyNameFromType(nameType);
                    return getTypeOfPropertyOfType(parentType, text);
                }
            }