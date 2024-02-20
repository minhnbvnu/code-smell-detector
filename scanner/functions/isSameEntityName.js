function isSameEntityName(name, initializer) {
            if (isPropertyNameLiteral(name) && isPropertyNameLiteral(initializer)) {
                return getTextOfIdentifierOrLiteral(name) === getTextOfIdentifierOrLiteral(initializer);
            }
            if (isMemberName(name) && isLiteralLikeAccess(initializer) && (initializer.expression.kind === 108 /* ThisKeyword */ || isIdentifier(initializer.expression) && (initializer.expression.escapedText === "window" || initializer.expression.escapedText === "self" || initializer.expression.escapedText === "global"))) {
                return isSameEntityName(name, getNameOrArgument(initializer));
            }
            if (isLiteralLikeAccess(name) && isLiteralLikeAccess(initializer)) {
                return getElementOrPropertyAccessName(name) === getElementOrPropertyAccessName(initializer) && isSameEntityName(name.expression, initializer.expression);
            }
            return false;
        }