function hasTypeParameterDefault(typeParameter) {
                return !!(typeParameter.symbol && forEach(typeParameter.symbol.declarations, (decl) => isTypeParameterDeclaration(decl) && decl.default));
            }