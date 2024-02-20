function typesDefinitelyUnrelated(source, target) {
                return isTupleType(source) && isTupleType(target) ? tupleTypesDefinitelyUnrelated(source, target) : !!getUnmatchedProperty(source, target, 
                /*requireOptionalProperties*/
                false, 
                /*matchDiscriminantProperties*/
                true) && !!getUnmatchedProperty(target, source, 
                /*requireOptionalProperties*/
                false, 
                /*matchDiscriminantProperties*/
                false);
            }