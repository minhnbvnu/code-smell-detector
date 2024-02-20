function parsePattern() {
        if (lookahead.type === Token.Identifier) {
            return parseVariableIdentifier();
        } else if (match('[')) {
            return parseArrayPattern();
        } else if (match('{')) {
            return parseObjectPattern();
        }
        throwUnexpectedToken(lookahead);
    }