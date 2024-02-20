function typesCast(node, types, options) {
            var i$, len$, type, ref$, valueType, value;
            for (i$ = 0, len$ = types.length; i$ < len$; ++i$) {
                type = types[i$];
                ref$ = typeCast(node, type, options), valueType = ref$.type, value = ref$.value;
                if (valueType === 'Nothing') {
                    continue;
                }
                if (parsedTypeCheck([type], value, {
                    customTypes: options.customTypes
                })) {
                    return value;
                }
            }
            throw new Error("Value " + JSON.stringify(node) + " does not type check against " + JSON.stringify(types) + ".");
        }