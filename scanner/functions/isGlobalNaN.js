function isGlobalNaN(expr) {
                    if (isIdentifier(expr) && expr.escapedText === "NaN") {
                        const globalNaNSymbol = getGlobalNaNSymbol();
                        return !!globalNaNSymbol && globalNaNSymbol === getResolvedSymbol(expr);
                    }
                    return false;
                }