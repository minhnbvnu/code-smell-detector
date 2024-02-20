function isObjectLiteralMethodSymbol(symbol) {
                if (!(symbol.flags & (4 /* Property */ | 8192 /* Method */))) {
                    return false;
                }
                return true;
            }