function inferSignatureInstantiationForOverloadFailure(node, typeParameters, candidate, args, checkMode) {
                const inferenceContext = createInferenceContext(typeParameters, candidate, 
                /*flags*/
                isInJSFile(node) ? 2 /* AnyDefault */ : 0 /* None */);
                const typeArgumentTypes = inferTypeArguments(node, candidate, args, checkMode | 4 /* SkipContextSensitive */ | 8 /* SkipGenericFunctions */, inferenceContext);
                return createSignatureInstantiation(candidate, typeArgumentTypes);
            }