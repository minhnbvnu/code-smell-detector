function exitSubtree(ancestorFacts, excludeFacts, includeFacts) {
                hierarchyFacts = (hierarchyFacts & ~excludeFacts | includeFacts) & -32768 /* SubtreeFactsMask */ | ancestorFacts;
            }