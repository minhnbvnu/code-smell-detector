function transformJSDocFunctionType(node) {
            var _a2;
            return factory.createFunctionTypeNode(emptyArray, node.parameters.map(transformJSDocParameter), (_a2 = node.type) != null ? _a2 : factory.createKeywordTypeNode(131 /* AnyKeyword */));
        }