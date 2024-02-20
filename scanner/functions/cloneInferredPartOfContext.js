function cloneInferredPartOfContext(context) {
                const inferences = filter(context.inferences, hasInferenceCandidates);
                return inferences.length ? createInferenceContextWorker(map(inferences, cloneInferenceInfo), context.signature, context.flags, context.compareTypes) : void 0;
            }