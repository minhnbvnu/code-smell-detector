function parsePropertyNameWorker(allowComputedPropertyNames) {
                        if (token() === 10 /* StringLiteral */ || token() === 8 /* NumericLiteral */) {
                            const node = parseLiteralNode();
                            node.text = internIdentifier(node.text);
                            return node;
                        }
                        if (allowComputedPropertyNames && token() === 22 /* OpenBracketToken */) {
                            return parseComputedPropertyName();
                        }
                        if (token() === 80 /* PrivateIdentifier */) {
                            return parsePrivateIdentifier();
                        }
                        return parseIdentifierName();
                    }