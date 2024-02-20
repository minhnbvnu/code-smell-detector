function inspectVariantTypes(types) {
                const variantTypes = new Set();
                if (types.some(type => tsutils.isTypeFlagSet(type, ts.TypeFlags.Null | ts.TypeFlags.Undefined | ts.TypeFlags.VoidLike))) {
                    variantTypes.add('nullish');
                }
                const booleans = types.filter(type => tsutils.isTypeFlagSet(type, ts.TypeFlags.BooleanLike));
                // If incoming type is either "true" or "false", there will be one type
                // object with intrinsicName set accordingly
                // If incoming type is boolean, there will be two type objects with
                // intrinsicName set "true" and "false" each because of tsutils.unionTypeParts()
                if (booleans.length === 1) {
                    tsutils.isBooleanLiteralType(booleans[0], true)
                        ? variantTypes.add('truthy boolean')
                        : variantTypes.add('boolean');
                }
                else if (booleans.length === 2) {
                    variantTypes.add('boolean');
                }
                const strings = types.filter(type => tsutils.isTypeFlagSet(type, ts.TypeFlags.StringLike));
                if (strings.length) {
                    if (strings.some(type => type.isStringLiteral() && type.value !== '')) {
                        variantTypes.add('truthy string');
                    }
                    else {
                        variantTypes.add('string');
                    }
                }
                const numbers = types.filter(type => tsutils.isTypeFlagSet(type, ts.TypeFlags.NumberLike | ts.TypeFlags.BigIntLike));
                if (numbers.length) {
                    if (numbers.some(type => type.isNumberLiteral() && type.value !== 0)) {
                        variantTypes.add('truthy number');
                    }
                    else {
                        variantTypes.add('number');
                    }
                }
                if (types.some(type => tsutils.isTypeFlagSet(type, ts.TypeFlags.EnumLike))) {
                    variantTypes.add('enum');
                }
                if (types.some(type => !tsutils.isTypeFlagSet(type, ts.TypeFlags.Null |
                    ts.TypeFlags.Undefined |
                    ts.TypeFlags.VoidLike |
                    ts.TypeFlags.BooleanLike |
                    ts.TypeFlags.StringLike |
                    ts.TypeFlags.NumberLike |
                    ts.TypeFlags.BigIntLike |
                    ts.TypeFlags.TypeParameter |
                    ts.TypeFlags.Any |
                    ts.TypeFlags.Unknown |
                    ts.TypeFlags.Never))) {
                    variantTypes.add('object');
                }
                if (types.some(type => util.isTypeFlagSet(type, ts.TypeFlags.TypeParameter |
                    ts.TypeFlags.Any |
                    ts.TypeFlags.Unknown))) {
                    variantTypes.add('any');
                }
                if (types.some(type => tsutils.isTypeFlagSet(type, ts.TypeFlags.Never))) {
                    variantTypes.add('never');
                }
                return variantTypes;
            }