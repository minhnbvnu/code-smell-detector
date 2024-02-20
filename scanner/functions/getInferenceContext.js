function getInferenceContext(node) {
                for (let i = inferenceContextCount - 1; i >= 0; i--) {
                    if (isNodeDescendantOf(node, inferenceContextNodes[i])) {
                        return inferenceContexts[i];
                    }
                }
            }