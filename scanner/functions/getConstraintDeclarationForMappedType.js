function getConstraintDeclarationForMappedType(type) {
                return getEffectiveConstraintOfTypeParameter(type.declaration.typeParameter);
            }