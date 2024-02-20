function getIndexInfosOfSymbol(symbol) {
                const indexSymbol = getIndexSymbol(symbol);
                return indexSymbol ? getIndexInfosOfIndexSymbol(indexSymbol) : emptyArray;
            }