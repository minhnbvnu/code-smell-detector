function isAllowedAsNonBacktick(node) {
                const parent = node.parent;
                switch (parent === null || parent === void 0 ? void 0 : parent.type) {
                    case utils_1.AST_NODE_TYPES.TSAbstractMethodDefinition:
                    case utils_1.AST_NODE_TYPES.TSMethodSignature:
                    case utils_1.AST_NODE_TYPES.TSPropertySignature:
                    case utils_1.AST_NODE_TYPES.TSModuleDeclaration:
                    case utils_1.AST_NODE_TYPES.TSLiteralType:
                    case utils_1.AST_NODE_TYPES.TSExternalModuleReference:
                        return true;
                    case utils_1.AST_NODE_TYPES.TSEnumMember:
                        return node === parent.id;
                    case utils_1.AST_NODE_TYPES.TSAbstractPropertyDefinition:
                    case utils_1.AST_NODE_TYPES.PropertyDefinition:
                        return node === parent.key;
                    default:
                        return false;
                }
            }