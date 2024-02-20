function getSimplifiedIndexedAccessType(type, writing) {
                const cache = writing ? "simplifiedForWriting" : "simplifiedForReading";
                if (type[cache]) {
                    return type[cache] === circularConstraintType ? type : type[cache];
                }
                type[cache] = circularConstraintType;
                const objectType = getSimplifiedType(type.objectType, writing);
                const indexType = getSimplifiedType(type.indexType, writing);
                const distributedOverIndex = distributeObjectOverIndexType(objectType, indexType, writing);
                if (distributedOverIndex) {
                    return type[cache] = distributedOverIndex;
                }
                if (!(indexType.flags & 465829888 /* Instantiable */)) {
                    const distributedOverObject = distributeIndexOverObjectType(objectType, indexType, writing);
                    if (distributedOverObject) {
                        return type[cache] = distributedOverObject;
                    }
                }
                if (isGenericTupleType(objectType) && indexType.flags & 296 /* NumberLike */) {
                    const elementType = getElementTypeOfSliceOfTupleType(objectType, indexType.flags & 8 /* Number */ ? 0 : objectType.target.fixedLength, 
                    /*endSkipCount*/
                    0, writing);
                    if (elementType) {
                        return type[cache] = elementType;
                    }
                }
                if (isGenericMappedType(objectType)) {
                    if (!getNameTypeFromMappedType(objectType) || isFilteringMappedType(objectType)) {
                        return type[cache] = mapType(substituteIndexedMappedType(objectType, type.indexType), (t) => getSimplifiedType(t, writing));
                    }
                }
                return type[cache] = type;
            }