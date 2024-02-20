function tryGetPropertyName(node, compilerOptions, quotePreference) {
            if (isPropertyAccessExpression(node)) {
                return node.name;
            }
            const propName = node.argumentExpression;
            if (isNumericLiteral(propName)) {
                return propName;
            }
            if (isStringLiteralLike(propName)) {
                return isIdentifierText(propName.text, getEmitScriptTarget(compilerOptions)) ? factory.createIdentifier(propName.text) : isNoSubstitutionTemplateLiteral(propName) ? factory.createStringLiteral(propName.text, quotePreference === 0 /* Single */) : propName;
            }
            return void 0;
        }