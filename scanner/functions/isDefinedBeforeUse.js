function isDefinedBeforeUse(variable, reference) {
                return (variable.identifiers[0].range[1] <= reference.identifier.range[1] &&
                    !isInInitializer(variable, reference));
            }