function getFlowTypeOfDestructuring(node, declaredType) {
                const reference = getSyntheticElementAccess(node);
                return reference ? getFlowTypeOfReference(reference, declaredType) : declaredType;
            }