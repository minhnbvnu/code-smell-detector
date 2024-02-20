function processValue(key, val, shouldStripQuotes) {
                if (shouldStripQuotes) {
                    val = stripQuotes(val);
                }
                if (checkAllAliases(key, flags.bools) || checkAllAliases(key, flags.counts)) {
                    if (typeof val === 'string')
                        val = val === 'true';
                }
                let value = Array.isArray(val)
                    ? val.map(function (v) { return maybeCoerceNumber(key, v); })
                    : maybeCoerceNumber(key, val);
                if (checkAllAliases(key, flags.counts) && (isUndefined(value) || typeof value === 'boolean')) {
                    value = increment();
                }
                if (checkAllAliases(key, flags.normalize) && checkAllAliases(key, flags.arrays)) {
                    if (Array.isArray(val))
                        value = val.map((val) => { return mixin.normalize(val); });
                    else
                        value = mixin.normalize(val);
                }
                return value;
            }