function advanceJSXChild() {
        var ch = source.charCodeAt(index);

        // '<' 60, '>' 62, '{' 123, '}' 125
        if (ch !== 60 && ch !== 62 && ch !== 123 && ch !== 125) {
            return scanJSXText(['<', '>', '{', '}']);
        }

        return scanPunctuator();
    }