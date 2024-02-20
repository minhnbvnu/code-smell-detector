function getEndWithSpaces(token, sourceCode) {
        const text = sourceCode.text;
        let end = token.range[1];
        // Detect spaces after the token.
        while (ANY_SPACE.test(text[end] || "")) {
            end += 1;
        }
        return end;
    }