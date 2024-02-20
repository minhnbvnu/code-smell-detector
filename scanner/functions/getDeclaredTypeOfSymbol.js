function getDeclaredTypeOfSymbol(symbol) {
                return tryGetDeclaredTypeOfSymbol(symbol) || errorType;
            }