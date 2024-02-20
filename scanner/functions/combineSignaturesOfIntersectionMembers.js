function combineSignaturesOfIntersectionMembers(left, right) {
                const typeParams = left.typeParameters || right.typeParameters;
                let paramMapper;
                if (left.typeParameters && right.typeParameters) {
                    paramMapper = createTypeMapper(right.typeParameters, left.typeParameters);
                }
                const declaration = left.declaration;
                const params = combineIntersectionParameters(left, right, paramMapper);
                const thisParam = combineIntersectionThisParam(left.thisParameter, right.thisParameter, paramMapper);
                const minArgCount = Math.max(left.minArgumentCount, right.minArgumentCount);
                const result = createSignature(declaration, typeParams, thisParam, params, 
                /*resolvedReturnType*/
                void 0, 
                /*resolvedTypePredicate*/
                void 0, minArgCount, (left.flags | right.flags) & 39 /* PropagatingFlags */);
                result.compositeKind = 2097152 /* Intersection */;
                result.compositeSignatures = concatenate(left.compositeKind === 2097152 /* Intersection */ && left.compositeSignatures || [left], [right]);
                if (paramMapper) {
                    result.mapper = left.compositeKind === 2097152 /* Intersection */ && left.mapper && left.compositeSignatures ? combineTypeMappers(left.mapper, paramMapper) : paramMapper;
                }
                return result;
            }