function getDxDy() {
            const compiledSymbol = geoToEdit._getCompiledSymbol();
            hanldeDxdy.x = compiledSymbol.lineDx || 0;
            hanldeDxdy.y = compiledSymbol.lineDy || 0;
            return hanldeDxdy;
        }