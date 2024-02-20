function betterReplacer(key, value) {
            if (replacer) { value = replacer(key, value); }

            if (typeof value === 'undefined') { return UndefinedSymbol; }
            if ((typeof value === 'number') && isNaN(value)) { return NaNSymbol; }
            
            switch (value) {
            case Infinity:  return InfinitySymbol;
            case -Infinity: return NegInfinitySymbol;
            default:        return value;
            }
        }