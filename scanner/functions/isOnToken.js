function isOnToken() {
                const current = lastTokenInfo ? lastTokenInfo.token.kind : scanner2.getToken();
                return current !== 1 /* EndOfFileToken */ && !isTrivia(current);
            }