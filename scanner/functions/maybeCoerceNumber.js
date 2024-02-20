function maybeCoerceNumber(key, value) {
                if (!configuration['parse-positional-numbers'] && key === '_')
                    return value;
                if (!checkAllAliases(key, flags.strings) && !checkAllAliases(key, flags.bools) && !Array.isArray(value)) {
                    const shouldCoerceNumber = looksLikeNumber(value) && configuration['parse-numbers'] && (Number.isSafeInteger(Math.floor(parseFloat(`${value}`))));
                    if (shouldCoerceNumber || (!isUndefined(value) && checkAllAliases(key, flags.numbers))) {
                        value = Number(value);
                    }
                }
                return value;
            }