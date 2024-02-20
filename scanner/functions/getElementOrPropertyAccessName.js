function getElementOrPropertyAccessName(node) {
            const name = getElementOrPropertyAccessArgumentExpressionOrName(node);
            if (name) {
                if (isIdentifier(name)) {
                    return name.escapedText;
                }
                if (isStringLiteralLike(name) || isNumericLiteral(name)) {
                    return escapeLeadingUnderscores(name.text);
                }
            }
            return void 0;
        }