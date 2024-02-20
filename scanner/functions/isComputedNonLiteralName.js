function isComputedNonLiteralName(name) {
            return name.kind === 164 /* ComputedPropertyName */ && !isStringOrNumericLiteralLike(name.expression);
        }