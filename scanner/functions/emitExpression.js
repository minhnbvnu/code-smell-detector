function emitExpression(node, parenthesizerRule) {
                if (node === void 0)
                    return;
                pipelineEmit(1 /* Expression */, node, parenthesizerRule);
            }