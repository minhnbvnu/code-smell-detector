function getTypeNodeTypePartFlags(typeNode) {
                const keywordTypeFlags = keywordNodeTypesToTsTypes.get(typeNode.type);
                if (keywordTypeFlags) {
                    return [
                        {
                            typeFlags: keywordTypeFlags,
                            typeName: describeLiteralTypeNode(typeNode),
                        },
                    ];
                }
                if (typeNode.type === utils_1.AST_NODE_TYPES.TSLiteralType &&
                    typeNode.literal.type === utils_1.AST_NODE_TYPES.Literal) {
                    return [
                        {
                            typeFlags: primitiveTypeFlagTypes[typeof typeNode.literal
                                .value],
                            typeName: describeLiteralTypeNode(typeNode),
                        },
                    ];
                }
                if (typeNode.type === utils_1.AST_NODE_TYPES.TSUnionType) {
                    return typeNode.types.flatMap(getTypeNodeTypePartFlags);
                }
                const tsNode = parserServices.esTreeNodeToTSNodeMap.get(typeNode);
                const checker = parserServices.program.getTypeChecker();
                const nodeType = checker.getTypeAtLocation(tsNode);
                const typeParts = unionTypePartsUnlessBoolean(nodeType);
                return typeParts.map(typePart => ({
                    typeFlags: typePart.flags,
                    typeName: describeLiteralType(typePart),
                }));
            }