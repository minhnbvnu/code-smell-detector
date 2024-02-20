function getTypeFromBindingElement(element, includePatternInType, reportErrors2) {
                if (element.initializer) {
                    const contextualType = isBindingPattern(element.name) ? getTypeFromBindingPattern(element.name, 
                    /*includePatternInType*/
                    true, 
                    /*reportErrors*/
                    false) : unknownType;
                    return addOptionality(widenTypeInferredFromInitializer(element, checkDeclarationInitializer(element, 0 /* Normal */, contextualType)));
                }
                if (isBindingPattern(element.name)) {
                    return getTypeFromBindingPattern(element.name, includePatternInType, reportErrors2);
                }
                if (reportErrors2 && !declarationBelongsToPrivateAmbientMember(element)) {
                    reportImplicitAny(element, anyType);
                }
                return includePatternInType ? nonInferrableAnyType : anyType;
            }