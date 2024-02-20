function appendTypeParameters(typeParameters, declarations) {
                for (const declaration of declarations) {
                    typeParameters = appendIfUnique(typeParameters, getDeclaredTypeOfTypeParameter(getSymbolOfDeclaration(declaration)));
                }
                return typeParameters;
            }