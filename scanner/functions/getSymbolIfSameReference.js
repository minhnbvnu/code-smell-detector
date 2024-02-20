function getSymbolIfSameReference(s1, s2) {
                if (getMergedSymbol(resolveSymbol(getMergedSymbol(s1))) === getMergedSymbol(resolveSymbol(getMergedSymbol(s2)))) {
                    return s1;
                }
            }