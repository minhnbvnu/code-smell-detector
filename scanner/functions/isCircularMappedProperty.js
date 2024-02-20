function isCircularMappedProperty(symbol) {
                return !!(getCheckFlags(symbol) & 262144 /* Mapped */ && !symbol.links.type && findResolutionCycleStartIndex(symbol, 0 /* Type */) >= 0);
            }