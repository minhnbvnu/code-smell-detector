function parseLiteralLikeNode(kind) {
                        const pos = getNodePos();
                        const node = isTemplateLiteralKind(kind) ? factory2.createTemplateLiteralLikeNode(kind, scanner2.getTokenValue(), getTemplateLiteralRawText(kind), scanner2.getTokenFlags() & 2048 /* TemplateLiteralLikeFlags */) : (
                        // Octal literals are not allowed in strict mode or ES5
                        // Note that theoretically the following condition would hold true literals like 009,
                        // which is not octal. But because of how the scanner separates the tokens, we would
                        // never get a token like this. Instead, we would get 00 and 9 as two separate tokens.
                        // We also do not need to check for negatives because any prefix operator would be part of a
                        // parent unary expression.
                        kind === 8 /* NumericLiteral */ ? factoryCreateNumericLiteral(scanner2.getTokenValue(), scanner2.getNumericLiteralFlags()) : kind === 10 /* StringLiteral */ ? factoryCreateStringLiteral(scanner2.getTokenValue(), 
                        /*isSingleQuote*/
                        void 0, scanner2.hasExtendedUnicodeEscape()) : isLiteralKind(kind) ? factoryCreateLiteralLikeNode(kind, scanner2.getTokenValue()) : Debug.fail());
                        if (scanner2.hasExtendedUnicodeEscape()) {
                            node.hasExtendedUnicodeEscape = true;
                        }
                        if (scanner2.isUnterminated()) {
                            node.isUnterminated = true;
                        }
                        nextToken();
                        return finishNode(node, pos);
                    }