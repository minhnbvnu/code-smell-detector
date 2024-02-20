function createHelperVariable(node, suffix) {
                return factory2.createUniqueName(`${getHelperVariableName(node)}_${suffix}`, 16 /* Optimistic */ | 8 /* ReservedInNestedScopes */);
            }