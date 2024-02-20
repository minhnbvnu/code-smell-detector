function parseTypePredicatePrefix() {
                        const id = parseIdentifier();
                        if (token() === 140 /* IsKeyword */ && !scanner2.hasPrecedingLineBreak()) {
                            nextToken();
                            return id;
                        }
                    }