function LexInitialize() {
        TypeScript.initializeStaticTokens();
        autoToken[TypeScript.LexCodeLPR] = TypeScript.staticTokens[TypeScript.TokenID.OpenParen];
        autoToken[TypeScript.LexCodeRPR] = TypeScript.staticTokens[TypeScript.TokenID.CloseParen];
        autoToken[TypeScript.LexCodeCMA] = TypeScript.staticTokens[TypeScript.TokenID.Comma];
        autoToken[TypeScript.LexCodeSMC] = TypeScript.staticTokens[TypeScript.TokenID.Semicolon];
        autoToken[TypeScript.LexCodeLBR] = TypeScript.staticTokens[TypeScript.TokenID.OpenBracket];
        autoToken[TypeScript.LexCodeRBR] = TypeScript.staticTokens[TypeScript.TokenID.CloseBracket];
        autoToken[TypeScript.LexCodeTIL] = TypeScript.staticTokens[TypeScript.TokenID.Tilde];
        autoToken[TypeScript.LexCodeQUE] = TypeScript.staticTokens[TypeScript.TokenID.Question];
        autoToken[TypeScript.LexCodeLC] = TypeScript.staticTokens[TypeScript.TokenID.OpenBrace];
        autoToken[TypeScript.LexCodeRC] = TypeScript.staticTokens[TypeScript.TokenID.CloseBrace];
        autoToken[TypeScript.LexCodeCOL] = TypeScript.staticTokens[TypeScript.TokenID.Colon];
        TypeScript.LexKeywordTable = new TypeScript.StringHashTable();
        for(var i in (TypeScript.TokenID)._map) {
            if((i) <= TypeScript.TokenID.LimKeyword) {
                TypeScript.LexKeywordTable.add((TypeScript.TokenID)._map[i].toLowerCase(), i);
            }
        }
        for(var j = 0; j < TypeScript.LexCodeASCIIChars; j++) {
            if(LexIsIdentifierStartChar(j)) {
                lexIdStartTable[j] = true;
            } else {
                lexIdStartTable[j] = false;
            }
        }
    }