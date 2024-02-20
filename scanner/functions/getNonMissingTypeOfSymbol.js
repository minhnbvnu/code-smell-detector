function getNonMissingTypeOfSymbol(symbol) {
                return removeMissingType(getTypeOfSymbol(symbol), !!(symbol.flags & 16777216 /* Optional */));
            }