function pipelineEmitWithSourceMaps(hint, node) {
                const pipelinePhase = getNextPipelinePhase(3 /* SourceMaps */, hint, node);
                emitSourceMapsBeforeNode(node);
                pipelinePhase(hint, node);
                emitSourceMapsAfterNode(node);
            }