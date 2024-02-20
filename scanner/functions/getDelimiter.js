function getDelimiter(node) {
                const lastToken = sourceCode.getLastToken(node);
                if (lastToken &&
                    (util.isSemicolonToken(lastToken) || util.isCommaToken(lastToken))) {
                    return lastToken.value;
                }
                return '';
            }