function getTypes(node, compositionType = null) {
                if (node.type === utils_1.AST_NODE_TYPES.TSUnionType ||
                    node.type === utils_1.AST_NODE_TYPES.TSIntersectionType) {
                    return node.types.reduce((acc, type) => {
                        acc.push(...getTypes(type, node.type));
                        return acc;
                    }, []);
                }
                return [{ node, compositionType }];
            }