function instantiateContextualType(contextualType, node, contextFlags) {
                if (contextualType && maybeTypeOfKind(contextualType, 465829888 /* Instantiable */)) {
                    const inferenceContext = getInferenceContext(node);
                    if (inferenceContext && contextFlags & 1 /* Signature */ && some(inferenceContext.inferences, hasInferenceCandidatesOrDefault)) {
                        return instantiateInstantiableTypes(contextualType, inferenceContext.nonFixingMapper);
                    }
                    if (inferenceContext == null ? void 0 : inferenceContext.returnMapper) {
                        const type = instantiateInstantiableTypes(contextualType, inferenceContext.returnMapper);
                        return type.flags & 1048576 /* Union */ && containsType(type.types, regularFalseType) && containsType(type.types, regularTrueType) ? filterType(type, (t) => t !== regularFalseType && t !== regularTrueType) : type;
                    }
                }
                return contextualType;
            }