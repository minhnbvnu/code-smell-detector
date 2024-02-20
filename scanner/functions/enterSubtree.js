function enterSubtree(excludeFacts, includeFacts) {
                const ancestorFacts = hierarchyFacts;
                hierarchyFacts = (hierarchyFacts & ~excludeFacts | includeFacts) & 32767 /* AncestorFactsMask */;
                return ancestorFacts;
            }