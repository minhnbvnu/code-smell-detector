function doWithHierarchyFacts(cb, value, excludeFacts, includeFacts) {
                if (affectsSubtree(excludeFacts, includeFacts)) {
                    const ancestorFacts = enterSubtree(excludeFacts, includeFacts);
                    const result = cb(value);
                    exitSubtree(ancestorFacts);
                    return result;
                }
                return cb(value);
            }