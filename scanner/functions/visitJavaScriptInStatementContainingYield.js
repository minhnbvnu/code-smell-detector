function visitJavaScriptInStatementContainingYield(node) {
                switch (node.kind) {
                    case 243 /* DoStatement */:
                        return visitDoStatement(node);
                    case 244 /* WhileStatement */:
                        return visitWhileStatement(node);
                    case 252 /* SwitchStatement */:
                        return visitSwitchStatement(node);
                    case 253 /* LabeledStatement */:
                        return visitLabeledStatement(node);
                    default:
                        return visitJavaScriptInGeneratorFunctionBody(node);
                }
            }