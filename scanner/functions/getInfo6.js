function getInfo6(checker, sourceFile, position, errorCode) {
            const node = getTokenAtPosition(sourceFile, position);
            if (!node.parent)
                return void 0;
            const declaration = findAncestor(node.parent, isFunctionLikeDeclaration);
            switch (errorCode) {
                case Diagnostics.A_function_whose_declared_type_is_neither_void_nor_any_must_return_a_value.code:
                    if (!declaration || !declaration.body || !declaration.type || !rangeContainsRange(declaration.type, node))
                        return void 0;
                    return getFixInfo(checker, declaration, checker.getTypeFromTypeNode(declaration.type), 
                    /* isFunctionType */
                    false);
                case Diagnostics.Argument_of_type_0_is_not_assignable_to_parameter_of_type_1.code:
                    if (!declaration || !isCallExpression(declaration.parent) || !declaration.body)
                        return void 0;
                    const pos = declaration.parent.arguments.indexOf(declaration);
                    const type = checker.getContextualTypeForArgumentAtIndex(declaration.parent, pos);
                    if (!type)
                        return void 0;
                    return getFixInfo(checker, declaration, type, 
                    /* isFunctionType */
                    true);
                case Diagnostics.Type_0_is_not_assignable_to_type_1.code:
                    if (!isDeclarationName(node) || !isVariableLike(node.parent) && !isJsxAttribute(node.parent))
                        return void 0;
                    const initializer = getVariableLikeInitializer(node.parent);
                    if (!initializer || !isFunctionLikeDeclaration(initializer) || !initializer.body)
                        return void 0;
                    return getFixInfo(checker, initializer, checker.getTypeAtLocation(node.parent), 
                    /* isFunctionType */
                    true);
            }
            return void 0;
        }