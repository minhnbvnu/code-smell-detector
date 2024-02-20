function createClassMemberDecoratorContextTypeForNode(node, thisType, valueType) {
                const isStatic2 = hasStaticModifier(node);
                const isPrivate = isPrivateIdentifier(node.name);
                const nameType = isPrivate ? getStringLiteralType(idText(node.name)) : getLiteralTypeFromPropertyName(node.name);
                const contextType = isMethodDeclaration(node) ? createClassMethodDecoratorContextType(thisType, valueType) : isGetAccessorDeclaration(node) ? createClassGetterDecoratorContextType(thisType, valueType) : isSetAccessorDeclaration(node) ? createClassSetterDecoratorContextType(thisType, valueType) : isAutoAccessorPropertyDeclaration(node) ? createClassAccessorDecoratorContextType(thisType, valueType) : isPropertyDeclaration(node) ? createClassFieldDecoratorContextType(thisType, valueType) : Debug.failBadSyntaxKind(node);
                const overrideType = getClassMemberDecoratorContextOverrideType(nameType, isPrivate, isStatic2);
                return getIntersectionType([contextType, overrideType]);
            }