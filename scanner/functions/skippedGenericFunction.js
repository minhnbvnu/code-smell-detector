function skippedGenericFunction(node, checkMode) {
                if (checkMode & 2 /* Inferential */) {
                    const context = getInferenceContext(node);
                    context.flags |= 4 /* SkippedGenericFunction */;
                }
            }