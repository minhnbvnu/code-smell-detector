function createTupleType(elementTypes, elementFlags, readonly = false, namedMemberDeclarations) {
                const tupleTarget = getTupleTargetType(elementFlags || map(elementTypes, (_) => 1 /* Required */), readonly, namedMemberDeclarations);
                return tupleTarget === emptyGenericType ? emptyObjectType : elementTypes.length ? createNormalizedTypeReference(tupleTarget, elementTypes) : tupleTarget;
            }