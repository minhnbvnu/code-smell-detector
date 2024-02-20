function getConstraintDeclaration(type) {
                return mapDefined(filter(type.symbol && type.symbol.declarations, isTypeParameterDeclaration), getEffectiveConstraintOfTypeParameter)[0];
            }