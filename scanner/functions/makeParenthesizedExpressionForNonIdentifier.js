function makeParenthesizedExpressionForNonIdentifier(path) {
    const T = this.types;
    if (path.node && !path.isIdentifier()) {
        path.replaceWith(T.parenthesizedExpression(path.node));
    }
}