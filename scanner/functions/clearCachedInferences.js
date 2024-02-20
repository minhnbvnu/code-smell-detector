function clearCachedInferences(inferences) {
                for (const inference of inferences) {
                    if (!inference.isFixed) {
                        inference.inferredType = void 0;
                    }
                }
            }