function inferWithPriority(source, target, newPriority) {
                    const savePriority = priority;
                    priority |= newPriority;
                    inferFromTypes(source, target);
                    priority = savePriority;
                }