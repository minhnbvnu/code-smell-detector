function isTypeCloselyMatchedBy(s, t) {
                return !!(s.flags & 524288 /* Object */ && t.flags & 524288 /* Object */ && s.symbol && s.symbol === t.symbol || s.aliasSymbol && s.aliasTypeArguments && s.aliasSymbol === t.aliasSymbol);
            }