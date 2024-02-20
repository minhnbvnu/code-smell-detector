function isUnderlyingTypePrimitive(type) {
                if (util.isTypeFlagSet(type, ts.TypeFlags.StringLike)) {
                    return true;
                }
                if (options.allowNumber &&
                    util.isTypeFlagSet(type, ts.TypeFlags.NumberLike | ts.TypeFlags.BigIntLike)) {
                    return true;
                }
                if (options.allowBoolean &&
                    util.isTypeFlagSet(type, ts.TypeFlags.BooleanLike)) {
                    return true;
                }
                if (options.allowAny && util.isTypeAnyType(type)) {
                    return true;
                }
                if (options.allowRegExp &&
                    util.getTypeName(typeChecker, type) === 'RegExp') {
                    return true;
                }
                if (options.allowNullish &&
                    util.isTypeFlagSet(type, ts.TypeFlags.Null | ts.TypeFlags.Undefined)) {
                    return true;
                }
                return false;
            }