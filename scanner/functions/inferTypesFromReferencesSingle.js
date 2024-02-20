function inferTypesFromReferencesSingle(references2) {
                const usage = createEmptyUsage();
                for (const reference of references2) {
                    cancellationToken.throwIfCancellationRequested();
                    calculateUsageOfNode(reference, usage);
                }
                return inferTypes(usage);
            }