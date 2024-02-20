function getAssignedTypeOfShorthandPropertyAssignment(node) {
                return getTypeWithDefault(getAssignedTypeOfPropertyAssignment(node), node.objectAssignmentInitializer);
            }