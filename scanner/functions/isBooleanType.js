function isBooleanType(expressionType) {
                return tsutils.isTypeFlagSet(expressionType, ts.TypeFlags.Boolean | ts.TypeFlags.BooleanLiteral);
            }