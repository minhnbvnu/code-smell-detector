function visitIterationStatement(node, outermostLabeledStatement) {
                switch (node.kind) {
                    case 243 /* DoStatement */:
                    case 244 /* WhileStatement */:
                        return visitDoOrWhileStatement(node, outermostLabeledStatement);
                    case 245 /* ForStatement */:
                        return visitForStatement(node, outermostLabeledStatement);
                    case 246 /* ForInStatement */:
                        return visitForInStatement(node, outermostLabeledStatement);
                    case 247 /* ForOfStatement */:
                        return visitForOfStatement(node, outermostLabeledStatement);
                }
            }