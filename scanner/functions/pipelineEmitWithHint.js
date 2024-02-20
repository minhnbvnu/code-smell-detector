function pipelineEmitWithHint(hint, node) {
                onBeforeEmitNode == null ? void 0 : onBeforeEmitNode(node);
                if (preserveSourceNewlines) {
                    const savedPreserveSourceNewlines = preserveSourceNewlines;
                    beforeEmitNode(node);
                    pipelineEmitWithHintWorker(hint, node);
                    afterEmitNode(savedPreserveSourceNewlines);
                }
                else {
                    pipelineEmitWithHintWorker(hint, node);
                }
                onAfterEmitNode == null ? void 0 : onAfterEmitNode(node);
                currentParenthesizerRule = void 0;
            }