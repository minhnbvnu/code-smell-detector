function isJSDocSatisfiesExpression(node) {
            return isInJSFile(node) && isParenthesizedExpression(node) && hasJSDocNodes(node) && !!getJSDocSatisfiesTag(node);
        }