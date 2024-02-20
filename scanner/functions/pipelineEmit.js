function pipelineEmit(emitHint, node, parenthesizerRule) {
                currentParenthesizerRule = parenthesizerRule;
                const pipelinePhase = getPipelinePhase(0 /* Notification */, emitHint, node);
                pipelinePhase(emitHint, node);
                currentParenthesizerRule = void 0;
            }