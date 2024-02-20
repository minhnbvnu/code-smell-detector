function pipelineEmitWithSubstitution(hint, node) {
                const pipelinePhase = getNextPipelinePhase(1 /* Substitution */, hint, node);
                Debug.assertIsDefined(lastSubstitution);
                node = lastSubstitution;
                lastSubstitution = void 0;
                pipelinePhase(hint, node);
            }