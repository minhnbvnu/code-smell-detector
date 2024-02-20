function getFlowTypeOfProperty(reference, prop) {
                const initialType = (prop == null ? void 0 : prop.valueDeclaration) && (!isAutoTypedProperty(prop) || getEffectiveModifierFlags(prop.valueDeclaration) & 2 /* Ambient */) && getTypeOfPropertyInBaseClass(prop) || undefinedType;
                return getFlowTypeOfReference(reference, autoType, initialType);
            }