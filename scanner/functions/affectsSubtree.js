function affectsSubtree(excludeFacts, includeFacts) {
                return hierarchyFacts !== (hierarchyFacts & ~excludeFacts | includeFacts);
            }