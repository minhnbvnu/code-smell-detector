function checkBreakOrContinueStatement(node) {
                if (!checkGrammarStatementInAmbientContext(node))
                    checkGrammarBreakOrContinueStatement(node);
            }