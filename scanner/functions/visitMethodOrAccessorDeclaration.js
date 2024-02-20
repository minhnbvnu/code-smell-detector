function visitMethodOrAccessorDeclaration(node) {
                Debug.assert(!hasDecorators(node));
                if (!isPrivateIdentifierClassElementDeclaration(node) || !shouldTransformClassElementToWeakMap(node)) {
                    return visitEachChild(node, classElementVisitor, context);
                }
                const info = accessPrivateIdentifier2(node.name);
                Debug.assert(info, "Undeclared private name for property declaration.");
                if (!info.isValid) {
                    return node;
                }
                const functionName = getHoistedFunctionName(node);
                if (functionName) {
                    getPendingExpressions().push(factory2.createAssignment(functionName, factory2.createFunctionExpression(filter(node.modifiers, (m) => isModifier(m) && !isStaticModifier(m) && !isAccessorModifier(m)), node.asteriskToken, functionName, 
                    /* typeParameters */
                    void 0, visitParameterList(node.parameters, visitor, context), 
                    /* type */
                    void 0, visitFunctionBody(node.body, visitor, context))));
                }
                return void 0;
            }