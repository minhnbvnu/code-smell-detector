function instantiateSignatureInContextOf(signature, contextualSignature, inferenceContext, compareTypes) {
                const context = createInferenceContext(signature.typeParameters, signature, 0 /* None */, compareTypes);
                const restType = getEffectiveRestType(contextualSignature);
                const mapper = inferenceContext && (restType && restType.flags & 262144 /* TypeParameter */ ? inferenceContext.nonFixingMapper : inferenceContext.mapper);
                const sourceSignature = mapper ? instantiateSignature(contextualSignature, mapper) : contextualSignature;
                applyToParameterTypes(sourceSignature, signature, (source, target) => {
                    inferTypes(context.inferences, source, target);
                });
                if (!inferenceContext) {
                    applyToReturnTypes(contextualSignature, signature, (source, target) => {
                        inferTypes(context.inferences, source, target, 128 /* ReturnType */);
                    });
                }
                return getSignatureInstantiation(signature, getInferredTypes(context), isInJSFile(contextualSignature.declaration));
            }