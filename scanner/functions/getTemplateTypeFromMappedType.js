function getTemplateTypeFromMappedType(type) {
                return type.templateType || (type.templateType = type.declaration.type ? instantiateType(addOptionality(getTypeFromTypeNode(type.declaration.type), 
                /*isProperty*/
                true, !!(getMappedTypeModifiers(type) & 4 /* IncludeOptional */)), type.mapper) : errorType);
            }