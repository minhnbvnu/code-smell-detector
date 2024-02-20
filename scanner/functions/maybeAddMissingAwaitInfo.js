function maybeAddMissingAwaitInfo(errorNode, source, target) {
                    if (errorNode && reportErrors2 && errorOutputContainer.errors && errorOutputContainer.errors.length) {
                        if (getAwaitedTypeOfPromise(target)) {
                            return;
                        }
                        const awaitedTypeOfSource = getAwaitedTypeOfPromise(source);
                        if (awaitedTypeOfSource && isTypeRelatedTo(awaitedTypeOfSource, target, relation)) {
                            addRelatedInfo(errorOutputContainer.errors[0], createDiagnosticForNode(errorNode, Diagnostics.Did_you_forget_to_use_await));
                        }
                    }
                }