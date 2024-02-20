function hasTypeParameterByName(typeParameters, name) {
                return some(typeParameters, (tp) => tp.symbol.escapedName === name);
            }