function consumeElement(tokens, untilTest) {
            switch (tokens[0]) {
                case '[':
                    return consumeArray(tokens, true);
                case '(':
                    return consumeTuple(tokens, true);
                case '{':
                    return consumeFields(tokens, true);
                default:
                    return consumeValue(tokens, untilTest);
            }
        }