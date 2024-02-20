function isStringLiteralJsxAttribute(node) {
            return isStringLiteral(node) && node.parent && isJsxAttribute(node.parent);
        }