function getMembers(node) {
                switch (node.type) {
                    case utils_1.AST_NODE_TYPES.ClassBody:
                    case utils_1.AST_NODE_TYPES.Program:
                    case utils_1.AST_NODE_TYPES.TSModuleBlock:
                    case utils_1.AST_NODE_TYPES.TSInterfaceBody:
                    case utils_1.AST_NODE_TYPES.BlockStatement:
                        return node.body;
                    case utils_1.AST_NODE_TYPES.TSTypeLiteral:
                        return node.members;
                }
            }