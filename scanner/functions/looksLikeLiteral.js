function looksLikeLiteral(node) {
        return isNegativeNumericLiteral(node) || isStaticTemplateLiteral(node);
    }