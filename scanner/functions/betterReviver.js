function betterReviver(key, value) {
            // Restore the temporarily hidden IEEE 754 values
            switch (value) {
            case NaNSymbol:         value = NaN; break;
            case InfinitySymbol:    value = Infinity; break;
            case NegInfinitySymbol: value = -Infinity; break;
            case UndefinedSymbol:   value = undefined; break;
            }
            if (reviver) { value = reviver(key, value); }
            return value;
        }