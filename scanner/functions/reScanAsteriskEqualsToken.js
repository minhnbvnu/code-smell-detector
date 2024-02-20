function reScanAsteriskEqualsToken() {
                Debug.assert(token === 66 /* AsteriskEqualsToken */, "'reScanAsteriskEqualsToken' should only be called on a '*='");
                pos = tokenPos + 1;
                return token = 63 /* EqualsToken */;
            }