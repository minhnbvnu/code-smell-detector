function parseBracketedList(kind, parseElement, open, close) {
                        if (parseExpected(open)) {
                            const result = parseDelimitedList(kind, parseElement);
                            parseExpected(close);
                            return result;
                        }
                        return createMissingList();
                    }