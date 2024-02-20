function WrappingNode(startToken) {
        if (extra.range) {
            this.range = [startToken.start, 0];
        }
        if (extra.loc) {
            this.loc = new WrappingSourceLocation(startToken);
        }
    }