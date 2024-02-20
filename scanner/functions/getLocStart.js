function getLocStart() {
            if (node.parent && node.parent.type === utils_1.AST_NODE_TYPES.MethodDefinition) {
                // return the start location for class method
                if (node.parent.decorators && node.parent.decorators.length > 0) {
                    // exclude decorators
                    return sourceCode.getTokenAfter(node.parent.decorators[node.parent.decorators.length - 1]).loc.start;
                }
                return node.parent.loc.start;
            }
            if (node.parent &&
                node.parent.type === utils_1.AST_NODE_TYPES.Property &&
                node.parent.method) {
                // return the start location for object method shorthand
                return node.parent.loc.start;
            }
            // return the start location for a regular function
            return node.loc.start;
        }