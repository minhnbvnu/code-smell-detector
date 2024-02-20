function getIndexTypeForGenericType(type, stringsOnly) {
                return stringsOnly ? type.resolvedStringIndexType || (type.resolvedStringIndexType = createIndexType(type, 
                /*stringsOnly*/
                true)) : type.resolvedIndexType || (type.resolvedIndexType = createIndexType(type, 
                /*stringsOnly*/
                false));
            }