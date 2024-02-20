function equalTokens(left, right, sourceCode) {
        const tokensL = sourceCode.getTokens(left);
        const tokensR = sourceCode.getTokens(right);
        if (tokensL.length !== tokensR.length) {
            return false;
        }
        for (let i = 0; i < tokensL.length; ++i) {
            if (tokensL[i].type !== tokensR[i].type ||
                tokensL[i].value !== tokensR[i].value) {
                return false;
            }
        }
        return true;
    }