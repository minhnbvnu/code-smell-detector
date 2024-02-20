function getAliasVariances(symbol) {
                return getVariancesWorker(symbol, getSymbolLinks(symbol).typeParameters);
            }