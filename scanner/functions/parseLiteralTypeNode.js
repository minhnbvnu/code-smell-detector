function parseLiteralTypeNode(negative) {
                        const pos = getNodePos();
                        if (negative) {
                            nextToken();
                        }
                        let expression = token() === 110 /* TrueKeyword */ || token() === 95 /* FalseKeyword */ || token() === 104 /* NullKeyword */ ? parseTokenNode() : parseLiteralLikeNode(token());
                        if (negative) {
                            expression = finishNode(factory2.createPrefixUnaryExpression(40 /* MinusToken */, expression), pos);
                        }
                        return finishNode(factory2.createLiteralTypeNode(expression), pos);
                    }