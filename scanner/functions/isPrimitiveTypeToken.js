function isPrimitiveTypeToken(token) {
        switch(token.tokenId) {
            case TypeScript.TokenID.Any:
            case TypeScript.TokenID.Bool:
            case TypeScript.TokenID.Number:
            case TypeScript.TokenID.String: {
                return true;

            }
        }
        return false;
    }