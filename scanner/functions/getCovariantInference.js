function getCovariantInference(inference, signature) {
                const candidates = unionObjectAndArrayLiteralCandidates(inference.candidates);
                const primitiveConstraint = hasPrimitiveConstraint(inference.typeParameter) || isConstTypeVariable(inference.typeParameter);
                const widenLiteralTypes = !primitiveConstraint && inference.topLevel && (inference.isFixed || !isTypeParameterAtTopLevelInReturnType(signature, inference.typeParameter));
                const baseCandidates = primitiveConstraint ? sameMap(candidates, getRegularTypeOfLiteralType) : widenLiteralTypes ? sameMap(candidates, getWidenedLiteralType) : candidates;
                const unwidenedType = inference.priority & 416 /* PriorityImpliesCombination */ ? getUnionType(baseCandidates, 2 /* Subtype */) : getCommonSupertype(baseCandidates);
                return getWidenedType(unwidenedType);
            }