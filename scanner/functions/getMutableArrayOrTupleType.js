function getMutableArrayOrTupleType(type) {
                return type.flags & 1048576 /* Union */ ? mapType(type, getMutableArrayOrTupleType) : type.flags & 1 /* Any */ || isMutableArrayOrTuple(getBaseConstraintOfType(type) || type) ? type : isTupleType(type) ? createTupleType(getTypeArguments(type), type.target.elementFlags, 
                /*readonly*/
                false, type.target.labeledElementDeclarations) : createTupleType([type], [8 /* Variadic */]);
            }