function parseModuleSpecifier() {
                        if (token() === 10 /* StringLiteral */) {
                            const result = parseLiteralNode();
                            result.text = internIdentifier(result.text);
                            return result;
                        }
                        else {
                            return parseExpression();
                        }
                    }