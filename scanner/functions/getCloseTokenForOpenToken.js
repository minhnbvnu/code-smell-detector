function getCloseTokenForOpenToken(kind) {
            switch (kind) {
                case 20 /* OpenParenToken */:
                    return 21 /* CloseParenToken */;
                case 29 /* LessThanToken */:
                    return 31 /* GreaterThanToken */;
                case 18 /* OpenBraceToken */:
                    return 19 /* CloseBraceToken */;
            }
            return 0 /* Unknown */;
        }