function ancestorHasReturnType(node) {
        let ancestor = node.parent;
        if ((ancestor === null || ancestor === void 0 ? void 0 : ancestor.type) === utils_1.AST_NODE_TYPES.Property) {
            ancestor = ancestor.value;
        }
        // if the ancestor is not a return, then this function was not returned at all, so we can exit early
        const isReturnStatement = (ancestor === null || ancestor === void 0 ? void 0 : ancestor.type) === utils_1.AST_NODE_TYPES.ReturnStatement;
        const isBodylessArrow = (ancestor === null || ancestor === void 0 ? void 0 : ancestor.type) === utils_1.AST_NODE_TYPES.ArrowFunctionExpression &&
            ancestor.body.type !== utils_1.AST_NODE_TYPES.BlockStatement;
        if (!isReturnStatement && !isBodylessArrow) {
            return false;
        }
        while (ancestor) {
            switch (ancestor.type) {
                case utils_1.AST_NODE_TYPES.ArrowFunctionExpression:
                case utils_1.AST_NODE_TYPES.FunctionExpression:
                case utils_1.AST_NODE_TYPES.FunctionDeclaration:
                    if (ancestor.returnType) {
                        return true;
                    }
                    break;
                // const x: Foo = () => {};
                // Assume that a typed variable types the function expression
                case utils_1.AST_NODE_TYPES.VariableDeclarator:
                    if (ancestor.id.typeAnnotation) {
                        return true;
                    }
                    break;
            }
            ancestor = ancestor.parent;
        }
        return false;
    }