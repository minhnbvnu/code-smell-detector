function hasDefaultValue(node) {
                return node.kind === 205 /* BindingElement */ && !!node.initializer || node.kind === 223 /* BinaryExpression */ && node.operatorToken.kind === 63 /* EqualsToken */;
            }