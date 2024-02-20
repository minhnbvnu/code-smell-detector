function getPropertyNameForPropertyNameNode(name) {
            switch (name.kind) {
                case 79 /* Identifier */:
                case 80 /* PrivateIdentifier */:
                    return name.escapedText;
                case 10 /* StringLiteral */:
                case 8 /* NumericLiteral */:
                    return escapeLeadingUnderscores(name.text);
                case 164 /* ComputedPropertyName */:
                    const nameExpression = name.expression;
                    if (isStringOrNumericLiteralLike(nameExpression)) {
                        return escapeLeadingUnderscores(nameExpression.text);
                    }
                    else if (isSignedNumericLiteral(nameExpression)) {
                        if (nameExpression.operator === 40 /* MinusToken */) {
                            return tokenToString(nameExpression.operator) + nameExpression.operand.text;
                        }
                        return nameExpression.operand.text;
                    }
                    return void 0;
                default:
                    return Debug.assertNever(name);
            }
        }