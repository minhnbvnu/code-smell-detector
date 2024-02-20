function setTokenInfo(tokenId, reservation, binopPrecedence, binopNodeType, unopPrecedence, unopNodeType, text, ers) {
        if(tokenId !== undefined) {
            TypeScript.tokenTable[tokenId] = new TokenInfo(tokenId, reservation, binopPrecedence, binopNodeType, unopPrecedence, unopNodeType, text, ers);
            if(binopNodeType != TypeScript.NodeType.None) {
                TypeScript.nodeTypeTable[binopNodeType] = text;
                TypeScript.nodeTypeToTokTable[binopNodeType] = tokenId;
            }
            if(unopNodeType != TypeScript.NodeType.None) {
                TypeScript.nodeTypeTable[unopNodeType] = text;
            }
        }
    }