function updateTypeQueryNode(node, exprName, typeArguments) {
                return node.exprName !== exprName || node.typeArguments !== typeArguments ? update(createTypeQueryNode(exprName, typeArguments), node) : node;
            }