function inferToMappedType(source, target, constraintType) {
                    if (constraintType.flags & 1048576 /* Union */) {
                        let result = false;
                        for (const type of constraintType.types) {
                            result = inferToMappedType(source, target, type) || result;
                        }
                        return result;
                    }
                    if (constraintType.flags & 4194304 /* Index */) {
                        const inference = getInferenceInfoForType(constraintType.type);
                        if (inference && !inference.isFixed && !isFromInferenceBlockedSource(source)) {
                            const inferredType = inferTypeForHomomorphicMappedType(source, target, constraintType);
                            if (inferredType) {
                                inferWithPriority(inferredType, inference.typeParameter, getObjectFlags(source) & 262144 /* NonInferrableType */ ? 16 /* PartialHomomorphicMappedType */ : 8 /* HomomorphicMappedType */);
                            }
                        }
                        return true;
                    }
                    if (constraintType.flags & 262144 /* TypeParameter */) {
                        inferWithPriority(getIndexType(source), constraintType, 32 /* MappedTypeConstraint */);
                        const extendedConstraint = getConstraintOfType(constraintType);
                        if (extendedConstraint && inferToMappedType(source, target, extendedConstraint)) {
                            return true;
                        }
                        const propTypes = map(getPropertiesOfType(source), getTypeOfSymbol);
                        const indexTypes = map(getIndexInfosOfType(source), (info) => info !== enumNumberIndexInfo ? info.type : neverType);
                        inferFromTypes(getUnionType(concatenate(propTypes, indexTypes)), getTemplateTypeFromMappedType(target));
                        return true;
                    }
                    return false;
                }