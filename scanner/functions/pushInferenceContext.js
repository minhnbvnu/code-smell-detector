function pushInferenceContext(node, inferenceContext) {
                inferenceContextNodes[inferenceContextCount] = node;
                inferenceContexts[inferenceContextCount] = inferenceContext;
                inferenceContextCount++;
            }