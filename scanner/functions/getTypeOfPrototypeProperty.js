function getTypeOfPrototypeProperty(prototype) {
                const classType = getDeclaredTypeOfSymbol(getParentOfSymbol(prototype));
                return classType.typeParameters ? createTypeReference(classType, map(classType.typeParameters, (_) => anyType)) : classType;
            }