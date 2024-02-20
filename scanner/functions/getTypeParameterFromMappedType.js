function getTypeParameterFromMappedType(type) {
                return type.typeParameter || (type.typeParameter = getDeclaredTypeOfTypeParameter(getSymbolOfDeclaration(type.declaration.typeParameter)));
            }