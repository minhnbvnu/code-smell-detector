function getReferenceRoot(node) {
                const { parent: parent2 } = node;
                return parent2.kind === 214 /* ParenthesizedExpression */ || parent2.kind === 223 /* BinaryExpression */ && parent2.operatorToken.kind === 63 /* EqualsToken */ && parent2.left === node || parent2.kind === 223 /* BinaryExpression */ && parent2.operatorToken.kind === 27 /* CommaToken */ && parent2.right === node ? getReferenceRoot(parent2) : node;
            }