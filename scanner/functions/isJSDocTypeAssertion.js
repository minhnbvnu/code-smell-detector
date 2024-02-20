function isJSDocTypeAssertion(node) {
            return isParenthesizedExpression(node) && isInJSFile(node) && !!getJSDocTypeTag(node);
        }