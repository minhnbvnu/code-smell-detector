function pipelineEmitWithComments(hint, node) {
                const pipelinePhase = getNextPipelinePhase(2 /* Comments */, hint, node);
                const savedContainerPos = containerPos;
                const savedContainerEnd = containerEnd;
                const savedDeclarationListContainerEnd = declarationListContainerEnd;
                emitCommentsBeforeNode(node);
                pipelinePhase(hint, node);
                emitCommentsAfterNode(node, savedContainerPos, savedContainerEnd, savedDeclarationListContainerEnd);
            }