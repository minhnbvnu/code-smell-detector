function getApparentTypeOfIntersectionType(type) {
                return type.resolvedApparentType || (type.resolvedApparentType = getTypeWithThisArgument(type, type, 
                /*apparentType*/
                true));
            }