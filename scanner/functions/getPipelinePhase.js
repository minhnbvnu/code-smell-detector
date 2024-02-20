function getPipelinePhase(phase, emitHint, node) {
                switch (phase) {
                    case 0 /* Notification */:
                        if (onEmitNode !== noEmitNotification && (!isEmitNotificationEnabled || isEmitNotificationEnabled(node))) {
                            return pipelineEmitWithNotification;
                        }
                    case 1 /* Substitution */:
                        if (substituteNode !== noEmitSubstitution && (lastSubstitution = substituteNode(emitHint, node) || node) !== node) {
                            if (currentParenthesizerRule) {
                                lastSubstitution = currentParenthesizerRule(lastSubstitution);
                            }
                            return pipelineEmitWithSubstitution;
                        }
                    case 2 /* Comments */:
                        if (shouldEmitComments(node)) {
                            return pipelineEmitWithComments;
                        }
                    case 3 /* SourceMaps */:
                        if (shouldEmitSourceMaps(node)) {
                            return pipelineEmitWithSourceMaps;
                        }
                    case 4 /* Emit */:
                        return pipelineEmitWithHint;
                    default:
                        return Debug.assertNever(phase);
                }
            }