function parenthesizedExpressionProp(prop) {
    return function(path) {
        makeParenthesizedExpressionForNonIdentifier.call(this, path.get(prop));
    };
}