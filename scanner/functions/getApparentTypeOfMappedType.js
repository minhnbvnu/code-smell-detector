function getApparentTypeOfMappedType(type) {
                return type.resolvedApparentType || (type.resolvedApparentType = getResolvedApparentTypeOfMappedType(type));
            }