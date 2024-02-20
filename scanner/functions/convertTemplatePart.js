function convertTemplatePart(tokens, code) {
        const firstToken = tokens[0], lastTemplateToken = tokens[tokens.length - 1];
        const token = {
            type: Token.Template,
            value: code.slice(firstToken.start, lastTemplateToken.end)
        };
        if (firstToken.loc) {
            token.loc = {
                start: firstToken.loc.start,
                end: lastTemplateToken.loc.end
            };
        }
        if (firstToken.range) {
            token.start = firstToken.range[0];
            token.end = lastTemplateToken.range[1];
            token.range = [token.start, token.end];
        }
        return token;
    }