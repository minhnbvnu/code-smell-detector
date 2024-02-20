function shouldRescanGreaterThanToken(node) {
                switch (node.kind) {
                    case 33 /* GreaterThanEqualsToken */:
                    case 71 /* GreaterThanGreaterThanEqualsToken */:
                    case 72 /* GreaterThanGreaterThanGreaterThanEqualsToken */:
                    case 49 /* GreaterThanGreaterThanGreaterThanToken */:
                    case 48 /* GreaterThanGreaterThanToken */:
                        return true;
                }
                return false;
            }