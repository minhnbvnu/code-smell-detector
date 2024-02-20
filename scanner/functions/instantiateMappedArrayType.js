function instantiateMappedArrayType(arrayType, mappedType, mapper) {
                const elementType = instantiateMappedTypeTemplate(mappedType, numberType, 
                /*isOptional*/
                true, mapper);
                return isErrorType(elementType) ? errorType : createArrayType(elementType, getModifiedReadonlyState(isReadonlyArrayType(arrayType), getMappedTypeModifiers(mappedType)));
            }