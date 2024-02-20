function WrappingSourceLocation(startToken) {
        this.start = {
            line: startToken.lineNumber,
            column: startToken.start - startToken.lineStart
        };
        this.end = null;
    }