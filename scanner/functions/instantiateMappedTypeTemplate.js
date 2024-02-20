function instantiateMappedTypeTemplate(type, key, isOptional, mapper) {
                const templateMapper = appendTypeMapping(mapper, getTypeParameterFromMappedType(type), key);
                const propType = instantiateType(getTemplateTypeFromMappedType(type.target || type), templateMapper);
                const modifiers = getMappedTypeModifiers(type);
                return strictNullChecks && modifiers & 4 /* IncludeOptional */ && !maybeTypeOfKind(propType, 32768 /* Undefined */ | 16384 /* Void */) ? getOptionalType(propType, 
                /*isProperty*/
                true) : strictNullChecks && modifiers & 8 /* ExcludeOptional */ && isOptional ? getTypeWithFacts(propType, 524288 /* NEUndefined */) : propType;
            }