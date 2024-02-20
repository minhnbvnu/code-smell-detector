function sliceTupleType(type, index, endSkipCount = 0) {
                const target = type.target;
                const endIndex = getTypeReferenceArity(type) - endSkipCount;
                return index > target.fixedLength ? getRestArrayTypeOfTupleType(type) || createTupleType(emptyArray) : createTupleType(getTypeArguments(type).slice(index, endIndex), target.elementFlags.slice(index, endIndex), 
                /*readonly*/
                false, target.labeledElementDeclarations && target.labeledElementDeclarations.slice(index, endIndex));
            }