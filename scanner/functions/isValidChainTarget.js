function isValidChainTarget(node, allowIdentifier) {
        if (node.type === utils_1.AST_NODE_TYPES.ChainExpression) {
            return isValidChainTarget(node.expression, allowIdentifier);
        }
        if (node.type === utils_1.AST_NODE_TYPES.MemberExpression) {
            const isObjectValid = ALLOWED_MEMBER_OBJECT_TYPES.has(node.object.type) &&
                // make sure to validate the expression is of our expected structure
                isValidChainTarget(node.object, true);
            const isPropertyValid = node.computed
                ? ALLOWED_COMPUTED_PROP_TYPES.has(node.property.type) &&
                    // make sure to validate the member expression is of our expected structure
                    (node.property.type === utils_1.AST_NODE_TYPES.MemberExpression
                        ? isValidChainTarget(node.property, allowIdentifier)
                        : true)
                : ALLOWED_NON_COMPUTED_PROP_TYPES.has(node.property.type);
            return isObjectValid && isPropertyValid;
        }
        if (node.type === utils_1.AST_NODE_TYPES.CallExpression) {
            return isValidChainTarget(node.callee, allowIdentifier);
        }
        if (allowIdentifier &&
            (node.type === utils_1.AST_NODE_TYPES.Identifier ||
                node.type === utils_1.AST_NODE_TYPES.ThisExpression ||
                node.type === utils_1.AST_NODE_TYPES.MetaProperty)) {
            return true;
        }
        /*
        special case for the following, where we only want the left
        - foo !== null
        - foo != null
        - foo !== undefined
        - foo != undefined
        */
        return (node.type === utils_1.AST_NODE_TYPES.BinaryExpression &&
            ['!==', '!='].includes(node.operator) &&
            isValidChainTarget(node.left, allowIdentifier) &&
            (util.isUndefinedIdentifier(node.right) || util.isNullLiteral(node.right)));
    }