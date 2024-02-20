function valueGet(unencoded) {
                if (unencoded === void 0) {
                    unencoded = false;
                }
                if (unencoded) {
                    // return a copy of the raw values
                    return scope_Values.length === 1 ? scope_Values[0] : scope_Values.slice(0);
                }
                var values = scope_Values.map(options.format.to);
                // If only one handle is used, return a single value.
                if (values.length === 1) {
                    return values[0];
                }
                return values;
            }