function visitIterationStatementWithFacts(excludeFacts, includeFacts, node, outermostLabeledStatement, convert) {
                const ancestorFacts = enterSubtree(excludeFacts, includeFacts);
                const updated = convertIterationStatementBodyIfNecessary(node, outermostLabeledStatement, ancestorFacts, convert);
                exitSubtree(ancestorFacts, 0 /* None */, 0 /* None */);
                return updated;
            }