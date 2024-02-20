function isNodeValidFunction(node) {
                return [
                    utils_1.AST_NODE_TYPES.ArrowFunctionExpression,
                    utils_1.AST_NODE_TYPES.FunctionDeclaration,
                    utils_1.AST_NODE_TYPES.FunctionExpression,
                    utils_1.AST_NODE_TYPES.TSEmptyBodyFunctionExpression,
                    utils_1.AST_NODE_TYPES.TSFunctionType,
                    utils_1.AST_NODE_TYPES.TSConstructorType,
                    utils_1.AST_NODE_TYPES.TSCallSignatureDeclaration,
                    utils_1.AST_NODE_TYPES.TSConstructSignatureDeclaration,
                    utils_1.AST_NODE_TYPES.TSMethodSignature,
                    utils_1.AST_NODE_TYPES.TSDeclareFunction, // declare function _8(...args: any[]): unknown;
                ].includes(node.type);
            }