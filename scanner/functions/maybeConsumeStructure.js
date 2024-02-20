function maybeConsumeStructure(tokens) {
            switch (tokens[0]) {
                case '[':
                    return consumeArray(tokens);
                case '(':
                    return consumeTuple(tokens);
                case '{':
                    return consumeFields(tokens);
            }
        }