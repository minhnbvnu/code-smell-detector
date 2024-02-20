function pipelineEmitWithNotification(hint, node) {
                const pipelinePhase = getNextPipelinePhase(0 /* Notification */, hint, node);
                onEmitNode(hint, node, pipelinePhase);
            }