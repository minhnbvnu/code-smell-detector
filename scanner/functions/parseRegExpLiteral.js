function parseRegExpLiteral(source, options) {
        return new RegExpParser(options).parseLiteral(String(source));
    }