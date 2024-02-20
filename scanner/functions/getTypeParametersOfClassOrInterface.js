function getTypeParametersOfClassOrInterface(symbol) {
                return concatenate(getOuterTypeParametersOfClassOrInterface(symbol), getLocalTypeParametersOfClassOrInterfaceOrTypeAlias(symbol));
            }