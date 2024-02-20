function checkBlock(node) {
                if (node.kind === 238 /* Block */) {
                    checkGrammarStatementInAmbientContext(node);
                }
                if (isFunctionOrModuleBlock(node)) {
                    const saveFlowAnalysisDisabled = flowAnalysisDisabled;
                    forEach(node.statements, checkSourceElement);
                    flowAnalysisDisabled = saveFlowAnalysisDisabled;
                }
                else {
                    forEach(node.statements, checkSourceElement);
                }
                if (node.locals) {
                    registerForUnusedIdentifiersCheck(node);
                }
            }