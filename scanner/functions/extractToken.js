function extractToken(template, str, tokens) {
        const tokenMapping = {};
        for (const match of tokens)
            tokenMapping[`{${match}}`] = "(.*)";
        const tokenList = [];
        let regexpTemplate = "^" + escapeRegex(template) + "$";
        // Find the order of the tokens
        let i, tokenIndex, tokenEntry;
        for (const m in tokenMapping) {
            tokenIndex = template.indexOf(m);
            // Token found
            if (tokenIndex > -1) {
                regexpTemplate = regexpTemplate.replace(m, tokenMapping[m]);
                tokenEntry = {
                    index: tokenIndex,
                    token: m
                };
                for (i = 0; i < tokenList.length && tokenList[i].index < tokenIndex; i++)
                    ;
                // Insert it at index i
                if (i < tokenList.length)
                    tokenList.splice(i, 0, tokenEntry);
                else
                    tokenList.push(tokenEntry);
            }
        }
        regexpTemplate = regexpTemplate.replace(/\{[^{}]+\}/g, '.*');
        var match = new RegExp(regexpTemplate).exec(str);
        let result = null;
        if (match) {
            result = {};
            // Find your token entry
            for (i = 0; i < tokenList.length; i++)
                result[tokenList[i].token.slice(1, -1)] = match[i + 1];
        }
        return result;
    }