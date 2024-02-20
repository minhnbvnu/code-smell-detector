function getNextPipelinePhase(currentPhase, emitHint, node) {
                return getPipelinePhase(currentPhase + 1, emitHint, node);
            }