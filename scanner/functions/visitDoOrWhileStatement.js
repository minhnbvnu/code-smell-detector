function visitDoOrWhileStatement(node, outermostLabeledStatement) {
                return visitIterationStatementWithFacts(0 /* DoOrWhileStatementExcludes */, 1280 /* DoOrWhileStatementIncludes */, node, outermostLabeledStatement);
            }