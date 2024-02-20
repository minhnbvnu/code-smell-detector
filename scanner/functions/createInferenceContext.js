function createInferenceContext(typeParameters, signature, flags, compareTypes) {
                return createInferenceContextWorker(typeParameters.map(createInferenceInfo), signature, flags, compareTypes || compareTypesAssignable);
            }