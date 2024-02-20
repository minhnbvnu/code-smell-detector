function inferFromContravariantTypesWithPriority(source, target, newPriority) {
                    const savePriority = priority;
                    priority |= newPriority;
                    inferFromContravariantTypes(source, target);
                    priority = savePriority;
                }