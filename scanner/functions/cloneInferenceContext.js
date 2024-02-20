function cloneInferenceContext(context, extraFlags = 0) {
                return context && createInferenceContextWorker(map(context.inferences, cloneInferenceInfo), context.signature, context.flags | extraFlags, context.compareTypes);
            }