function isArrayLengthExpression(node, typeChecker, parserServices) {
        if (node.type !== utils_1.AST_NODE_TYPES.MemberExpression) {
            return false;
        }
        if (node.computed) {
            return false;
        }
        if (node.property.name !== 'length') {
            return false;
        }
        const objectTsNode = parserServices.esTreeNodeToTSNodeMap.get(node.object);
        const objectType = util.getConstrainedTypeAtLocation(typeChecker, objectTsNode);
        return util.isTypeArrayTypeOrUnionOfArrayTypes(objectType, typeChecker);
    }