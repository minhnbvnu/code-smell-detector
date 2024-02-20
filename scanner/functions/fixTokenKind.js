function fixTokenKind(tokenInfo, container) {
                if (isToken(container) && tokenInfo.token.kind !== container.kind) {
                    tokenInfo.token.kind = container.kind;
                }
                return tokenInfo;
            }