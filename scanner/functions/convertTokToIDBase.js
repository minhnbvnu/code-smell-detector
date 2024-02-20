function convertTokToIDBase(tok, identifierName, strictMode) {
        if(tok.tokenId <= TypeScript.TokenID.LimKeyword) {
            var tokInfo = TypeScript.lookupToken(tok.tokenId);
            if(tokInfo != undefined) {
                var resFlags = TypeScript.Reservation.Javascript | TypeScript.Reservation.JavascriptFuture;
                if(strictMode) {
                    resFlags |= TypeScript.Reservation.JavascriptFutureStrict;
                }
                if(identifierName || !TypeScript.hasFlag(tokInfo.reservation, resFlags)) {
                    return true;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    }