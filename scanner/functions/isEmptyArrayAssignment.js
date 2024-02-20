function isEmptyArrayAssignment(node) {
                return node.kind === 257 /* VariableDeclaration */ && node.initializer && isEmptyArrayLiteral2(node.initializer) || node.kind !== 205 /* BindingElement */ && node.parent.kind === 223 /* BinaryExpression */ && isEmptyArrayLiteral2(node.parent.right);
            }