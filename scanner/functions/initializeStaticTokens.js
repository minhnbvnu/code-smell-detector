function initializeStaticTokens() {
        for(var i = 0; i <= TokenID.LimFixed; i++) {
            TypeScript.staticTokens[i] = new Token(i);
        }
    }