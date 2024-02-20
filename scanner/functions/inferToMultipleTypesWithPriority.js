function inferToMultipleTypesWithPriority(source, targets, targetFlags, newPriority) {
                    const savePriority = priority;
                    priority |= newPriority;
                    inferToMultipleTypes(source, targets, targetFlags);
                    priority = savePriority;
                }