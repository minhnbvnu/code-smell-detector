function getStartWithSpaces(token, sourceCode) {
        const text = sourceCode.text;
        let start = token.range[0];
        // If the previous token is a line comment then skip this step to avoid commenting this token out.
        {
            const prevToken = sourceCode.getTokenBefore(token, { includeComments: true });
            if (prevToken && prevToken.type === "Line") {
                return start;
            }
        }
        // Detect spaces before the token.
        while (ANY_SPACE.test(text[start - 1] || "")) {
            start -= 1;
        }
        return start;
    }