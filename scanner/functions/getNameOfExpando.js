function getNameOfExpando(node) {
            if (isBinaryExpression(node.parent)) {
                const parent2 = (node.parent.operatorToken.kind === 56 /* BarBarToken */ || node.parent.operatorToken.kind === 60 /* QuestionQuestionToken */) && isBinaryExpression(node.parent.parent) ? node.parent.parent : node.parent;
                if (parent2.operatorToken.kind === 63 /* EqualsToken */ && isIdentifier(parent2.left)) {
                    return parent2.left;
                }
            }
            else if (isVariableDeclaration(node.parent)) {
                return node.parent.name;
            }
        }