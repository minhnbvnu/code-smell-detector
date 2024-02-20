function isTypeParameterUnused(typeParameter) {
                return !(getMergedSymbol(typeParameter.symbol).isReferenced & 262144 /* TypeParameter */) && !isIdentifierThatStartsWithUnderscore(typeParameter.name);
            }