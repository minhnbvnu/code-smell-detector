function rewind(token) {
        index = token.range[0];
        lineNumber = token.lineNumber;
        lineStart = token.lineStart;
        lookahead = token;
    }