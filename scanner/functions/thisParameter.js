function thisParameter() {
                const usage = createEmptyUsage();
                for (const reference of references) {
                    cancellationToken.throwIfCancellationRequested();
                    calculateUsageOfNode(reference, usage);
                }
                return combineTypes(usage.candidateThisTypes || emptyArray);
            }