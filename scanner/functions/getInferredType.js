function getInferredType(context, index) {
                const inference = context.inferences[index];
                if (!inference.inferredType) {
                    let inferredType;
                    const signature = context.signature;
                    if (signature) {
                        const inferredCovariantType = inference.candidates ? getCovariantInference(inference, signature) : void 0;
                        if (inference.contraCandidates) {
                            const useCovariantType = inferredCovariantType && !(inferredCovariantType.flags & 131072 /* Never */) && some(inference.contraCandidates, (t) => isTypeSubtypeOf(inferredCovariantType, t)) && every(context.inferences, (other) => other !== inference && getConstraintOfTypeParameter(other.typeParameter) !== inference.typeParameter || every(other.candidates, (t) => isTypeSubtypeOf(t, inferredCovariantType)));
                            inferredType = useCovariantType ? inferredCovariantType : getContravariantInference(inference);
                        }
                        else if (inferredCovariantType) {
                            inferredType = inferredCovariantType;
                        }
                        else if (context.flags & 1 /* NoDefault */) {
                            inferredType = silentNeverType;
                        }
                        else {
                            const defaultType = getDefaultFromTypeParameter(inference.typeParameter);
                            if (defaultType) {
                                inferredType = instantiateType(defaultType, mergeTypeMappers(createBackreferenceMapper(context, index), context.nonFixingMapper));
                            }
                        }
                    }
                    else {
                        inferredType = getTypeFromInference(inference);
                    }
                    inference.inferredType = inferredType || getDefaultTypeArgumentType(!!(context.flags & 2 /* AnyDefault */));
                    const constraint = getConstraintOfTypeParameter(inference.typeParameter);
                    if (constraint) {
                        const instantiatedConstraint = instantiateType(constraint, context.nonFixingMapper);
                        if (!inferredType || !context.compareTypes(inferredType, getTypeWithThisArgument(instantiatedConstraint, inferredType))) {
                            inference.inferredType = inferredType = instantiatedConstraint;
                        }
                    }
                }
                return inference.inferredType;
            }