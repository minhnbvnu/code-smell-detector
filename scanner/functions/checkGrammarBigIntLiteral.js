function checkGrammarBigIntLiteral(node) {
                const literalType = isLiteralTypeNode(node.parent) || isPrefixUnaryExpression(node.parent) && isLiteralTypeNode(node.parent.parent);
                if (!literalType) {
                    if (languageVersion < 7 /* ES2020 */) {
                        if (grammarErrorOnNode(node, Diagnostics.BigInt_literals_are_not_available_when_targeting_lower_than_ES2020)) {
                            return true;
                        }
                    }
                }
                return false;
            }