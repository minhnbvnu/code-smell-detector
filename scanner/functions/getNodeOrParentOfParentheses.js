function getNodeOrParentOfParentheses(file, startPosition) {
            const node = getTokenAtPosition(file, startPosition);
            const nestedBinary = getParentBinaryExpression(node);
            const isNonStringBinary = !treeToArray(nestedBinary).isValidConcatenation;
            if (isNonStringBinary && isParenthesizedExpression(nestedBinary.parent) && isBinaryExpression(nestedBinary.parent.parent)) {
                return nestedBinary.parent.parent;
            }
            return node;
        }